import React from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const TodoList = ({ todos, handleDeleteTodo, startEditingTodo }) => {
    return (
        <List>
            {todos.map((todo) => (
                <ListItem key={todo.id} divider>
                    <Checkbox
                        checked={todo.completed}
                        edge="start"
                        disableRipple
                    />
                    <ListItemText
                        primary={todo.title}
                        secondary={todo.description}
                    />
                    <IconButton edge="end" onClick={() => startEditingTodo(todo)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteTodo(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
};

export default TodoList;
