import React from 'react';
import { Box, Typography, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoItem = ({ todo, startEditing, handleDeleteTodo, toggleCompletion }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            border={1}
            borderColor="grey.400"
            borderRadius="8px"
            padding={2}
            marginBottom={2}
            bgcolor="#ffffff"
            boxShadow={2}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography 
                    variant="h6" 
                    component="h2" 
                    flexGrow={1} 
                    noWrap
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} // 완료된 항목에 취소선 추가
                >
                    {todo.title}
                </Typography>
                <IconButton onClick={() => startEditing(todo)} color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTodo(todo.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Typography 
                variant="body1" 
                color="textSecondary" 
                marginY={1}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} // 설명에도 취소선 추가
            >
                {todo.description}
            </Typography>
            <Typography 
                variant="body2" 
                color="textSecondary"
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} // 기한에도 취소선 추가
            >
                Due Date: {new Date(todo.due_date).toLocaleString()}
            </Typography>
            <Box display="flex" alignItems="center" marginTop={1}>
                <Checkbox 
                    checked={todo.completed} 
                    onChange={() => toggleCompletion(todo.id)} // 체크박스 클릭 시 상태 변경 처리
                    sx={{ 
                        color: todo.completed ? '#00796b' : '#cfd8dc', 
                        '&.Mui-checked': { 
                            color: '#00796b' 
                        } 
                    }}
                />
                <Typography 
                    variant="body2" 
                    color="textSecondary"
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} // 상태 텍스트에도 취소선 추가
                >
                    {todo.completed ? 'Completed' : 'Not Completed'}
                </Typography>
            </Box>
        </Box>
    );
};

export default TodoItem;
