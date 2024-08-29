import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {fetchTodos} from "../asyncThunks/fetchTodos.ts";
import {deleteTodo} from "../asyncThunks/deleteTodo.ts";
import {toggleStatus} from "../asyncThunks/toggleStatus.ts";

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
}

export interface TodoState {
    todosList: Todo[];
    status: null | "loading" | "resolved" | "rejected";
    error: undefined | { message: string };
}

const initialState: TodoState = {
    todosList: [],
    status: null,
    error: undefined
};

const setError = (state: TodoState, action: PayloadAction<{ message: string } | undefined>) => {
    state.status = "rejected";
    state.error = action.payload;
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todosList.push(action.payload);
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
        builder.addCase(fetchTodos.rejected, setError);
        builder.addCase(deleteTodo.rejected, setError);
        builder.addCase(toggleStatus.rejected, setError);
    },
});

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;
