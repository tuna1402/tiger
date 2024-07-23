import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Container, Typography, List, Box, Button, IconButton, Pagination } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './App.css';

// 한국 시간(KST)을 ISO 문자열 형식으로 가져오는 함수
const getCurrentKSTDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 9);
    return now.toISOString().substring(0, 16);
};

const motivationalQuotes = [
    "일정을 정리하는 것, 그것이 인생을 정리하는 첫걸음이다.",
    "오늘 한 일을 내일로 미루지 마세요!",
    "성공적인 일정 관리는 성공적인 인생의 비결입니다.",
    "작은 목표를 설정하고 달성할 때, 큰 성취를 이룰 수 있습니다.",
    "계획은 성공의 기초입니다. 오늘 계획을 세우세요!"
];

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(getCurrentKSTDateTime());
    const [completed, setCompleted] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAscending, setIsAscending] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:8000/api/todos/')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the todos!", error);
            });
    };

    const handleCreateOrUpdateTodo = (e) => {
        e.preventDefault();
        if (editingTodo) {
            axios.put(`http://localhost:8000/api/todos/${editingTodo.id}/`, {
                title,
                description,
                due_date: dueDate,
                completed
            })
            .then(response => {
                setTodos(todos.map(todo => (todo.id === editingTodo.id ? response.data : todo)));
                setEditingTodo(null);
                setTitle('');
                setDescription('');
                setDueDate(getCurrentKSTDateTime());
                setCompleted(false);
                setIsExpanded(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showCelebrateMessage("일정이 업데이트 되었습니다!"); // 일정 작성 완료 시 메시지
            })
            .catch(error => {
                console.error("There was an error updating the todo!", error);
            });
        } else {
            axios.post('http://localhost:8000/api/todos/', {
                title,
                description,
                due_date: dueDate,
                completed
            })
            .then(response => {
                setTodos([...todos, response.data]);
                setTitle('');
                setDescription('');
                setDueDate(getCurrentKSTDateTime());
                setCompleted(false);
                setIsExpanded(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showCelebrateMessage("새로운 일정이 추가되었습니다!"); // 일정 작성 시 메시지
            })
            .catch(error => {
                console.error("There was an error creating the todo!", error);
            });
        }
    };

    const startEditing = (todo) => {
        setEditingTodo(todo);
        setTitle(todo.title);
        setDescription(todo.description);
        setDueDate(todo.due_date);
        setCompleted(todo.completed);
        setIsExpanded(true);
    };

    const cancelEditing = () => {
        setEditingTodo(null);
        setTitle('');
        setDescription('');
        setDueDate(getCurrentKSTDateTime());
        setCompleted(false);
        setIsExpanded(false);
    };

    const handleDeleteTodo = (id) => {
        axios.delete(`http://localhost:8000/api/todos/${id}/`)
            .then(response => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => {
                console.error("There was an error deleting the todo!", error);
            });
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const toggleCompletion = (id) => {
        const todo = todos.find(t => t.id === id);
        axios.put(`http://localhost:8000/api/todos/${id}/`, {
            ...todo,
            completed: !todo.completed
        })
        .then(response => {
            setTodos(todos.map(t => (t.id === id ? response.data : t)));
            // 완료 상태가 true로 변경될 때만 축하 메시지 표시
            if (!todo.completed) {
                showCelebrateMessage("축하합니다! 일정이 완료되었습니다!");
            }
        })
        .catch(error => {
            console.error("There was an error updating the todo!", error);
        });
    };

    const filteredTodos = todos.filter(todo => {
        if (tabValue === 0) return true;
        if (tabValue === 1) return !todo.completed;
        if (tabValue === 2) return todo.completed;
        return true;
    });

    const sortedTodos = filteredTodos.sort((a, b) => {
        return isAscending ? a.id - b.id : b.id - a.id;
    });

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    const currentTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const showCelebrateMessage = (customMessage) => {
        setMessage(customMessage);
        setShowMessage(true);
        // 메시지를 3초 후 사라지게 하고, 사라지기 전에 애니메이션이 종료되도록 조절
        setTimeout(() => {
            setShowMessage(false);
        }, 3000); // 3초 동안 메시지 표시
    };

    return (
        <Container maxWidth="md" className="App">
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center" mb={2}>
                    <img src="/batis.png" alt="Team Logo" style={{ width: 50, height: 50, marginRight: 16 }} />
                    <Typography variant="h4" component="h1" gutterBottom style={{ marginBottom: 0 }}>
                        투 - 두 리스트
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" alignItems="center" mb={2}>
                        <Button onClick={() => setTabValue(0)} variant={tabValue === 0 ? 'contained' : 'outlined'}>
                            모든 일정 보기
                        </Button>
                        <Button onClick={() => setTabValue(1)} variant={tabValue === 1 ? 'contained' : 'outlined'}>
                            미완료 작업 보기
                        </Button>
                        <Button onClick={() => setTabValue(2)} variant={tabValue === 2 ? 'contained' : 'outlined'}>
                            완료된 작업 보기
                        </Button>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="body1" component="span" marginRight={2}>
                            정렬 순서
                        </Typography>
                        <IconButton
                            onClick={() => setIsAscending(true)}
                            color={isAscending ? 'primary' : 'default'}
                            aria-label="Sort Ascending"
                            style={{ marginRight: 8 }}
                        >
                            <ArrowUpwardIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => setIsAscending(false)}
                            color={!isAscending ? 'primary' : 'default'}
                            aria-label="Sort Descending"
                        >
                            <ArrowDownwardIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box mb={2}>
                    <Button onClick={() => setIsExpanded(!isExpanded)} variant="contained" color="primary">
                        {isExpanded ? '닫기' : '일정 쓰기'}
                    </Button>
                </Box>
            </Box>
            <Box
                display={isExpanded ? 'flex' : 'none'}
                flexDirection="column"
                mb={2}
                transition="max-height 0.3s ease, opacity 0.3s ease"
                maxHeight={isExpanded ? '500px' : '0'}
                overflow="hidden"
                borderRadius="8px"
                bgcolor="background.paper"
                p={2}
                opacity={isExpanded ? 1 : 0}
            >
                <TodoForm
                    handleCreateOrUpdateTodo={handleCreateOrUpdateTodo}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    completed={completed}
                    setCompleted={setCompleted}
                    editingTodo={editingTodo}
                    cancelEditing={cancelEditing}
                    setIsExpanded={setIsExpanded}
                />
            </Box>
            <List>
                {currentTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        startEditing={startEditing}
                        handleDeleteTodo={handleDeleteTodo}
                        toggleCompletion={toggleCompletion}
                    />
                ))}
            </List>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={Math.ceil(filteredTodos.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Box>
            {showMessage && (
                <div className={`celebrate-message ${!showMessage ? 'hidden' : ''}`}>
                    {message} <br />
                    <span className="quote">"{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"</span>
                </div>
            )}
        </Container>
    );
}

export default App;
