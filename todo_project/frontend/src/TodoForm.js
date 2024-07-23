import React from 'react';
import { TextField, Checkbox, Button, Box, FormControlLabel } from '@mui/material';
import './App.css'; // CSS 파일 임포트

const TodoForm = ({
    handleCreateOrUpdateTodo,
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    completed,
    setCompleted,
    editingTodo,
    cancelEditing,
    setIsExpanded // 폼 확장 상태를 제어하는 함수 추가
}) => {
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDueDate('');
        setCompleted(false);
    };

    const handleCancel = () => {
        resetForm();
        cancelEditing();
        setIsExpanded(false); // 폼을 닫는 함수 호출
    };

    return (
        <form onSubmit={handleCreateOrUpdateTodo} className="todo-form">
            <Box display="flex" flexDirection="column" mb={2}>
                <label htmlFor="title">제목</label>
                <TextField
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    margin="normal"
                />
                <label htmlFor="description">자세한 내용</label>
                <TextField
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                />
                <label htmlFor="due-date">언제까지?</label>
                <TextField
                    id="due-date"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                    }
                    label="완료한 작업"
                />
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Button type="submit" className="submit-button">
                    {editingTodo ? "Update Todo" : "Add Todo"}
                </Button>
                {editingTodo && (
                    <Button type="button" onClick={handleCancel} className="cancel-button">
                        취소
                    </Button>
                )}
                {(title || description || dueDate) && !editingTodo && (
                    <Button type="button" onClick={() => {
                        resetForm();
                        setIsExpanded(false); // 글쓰기 취소 후 폼 닫기
                    }} className="reset-button">
                        작성취소
                    </Button>
                )}
            </Box>
        </form>
    );
};

export default TodoForm;
