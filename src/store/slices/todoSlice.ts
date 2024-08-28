import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import {fetchTodos} from "../asyncThunks/fetchTodos.ts";

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export interface CounterState {
    todosList: Todo[];
    status: null | "loading" | "resolved" | "rejected";
    error: undefined | { message: string };
}

const initialState: CounterState = {
    todosList: [],
    status: null,
    error: undefined
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ text: string }>) => {
            state.todosList.push({
                id: uuidv4(),
                title: action.payload.text,
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
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = "loading";
            state.error = undefined;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "resolved";
            state.todosList = action.payload;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        });
    },
});

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;
