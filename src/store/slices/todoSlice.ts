import {createSlice, UnknownAction} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {fetchTodos} from "../asyncThunks/fetchTodos.ts";
import {deleteTodo} from "../asyncThunks/deleteTodo.ts";
import {toggleStatus} from "../asyncThunks/toggleStatus.ts";
import {addNewTodo} from "../asyncThunks/addNewTodo.ts";

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

const isError = (action: UnknownAction) => {
    return action.type.endsWith("rejected");
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // addTodo: (state, action: PayloadAction<Todo>) => {
        //     state.todosList.push(action.payload);
        // },
        // removeTodo: (state, action: PayloadAction<{ id: string }>) => {
        //     state.todosList = state.todosList.filter(todo => todo.id !== action.payload.id);
        // },
        // toggleTodoComplete: (state, action: PayloadAction<{ id: string }>) => {
        //     const nextTodo = state.todosList.find(todo => todo.id === action.payload.id);
        //
        //     if (nextTodo) {
        //         nextTodo.completed = !nextTodo.completed;
        //     }
        // },
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
        builder.addCase(addNewTodo.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(addNewTodo.fulfilled, (state, action) => {
            state.todosList.push(action.payload);
        });
        builder.addCase(toggleStatus.fulfilled, (state, action) => {
            const nextTodo = state.todosList.find(todo => todo.id === action.payload.id);

            if (nextTodo) {
                nextTodo.completed = !nextTodo.completed;
            }
        });
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.todosList = state.todosList.filter(todo => todo.id !== action.payload);
        });
        builder.addMatcher(isError, (state, action: PayloadAction<{ message: string } | undefined>) => {
            state.error = action.payload;
            state.status = "rejected";
        })
    },
});

//export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;
