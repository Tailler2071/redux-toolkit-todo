import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export interface CounterState {
    todosList: Todo[];
}

const initialState: CounterState = {
    todosList: [],
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ text: string }>) => {
            state.todosList.push({
                id: uuidv4(),
                text: action.payload.text,
                completed: false,
            });
        },
        removeTodo: (state, action: PayloadAction<{ id: string }>) => {
            state.todosList = state.todosList.filter(todo => todo.id !== action.payload.id);
        },
        toggleTodoComplete: (state, action: PayloadAction<{ id: string }>) => {
            const nextTodo = state.todosList.find(todo => todo.id === action.payload.id);

            if (nextTodo) {
                nextTodo.completed = !nextTodo.completed;
            }
        },
    },
});

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;
