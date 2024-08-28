import {createAsyncThunk} from "@reduxjs/toolkit";
import {Todo} from "../slices/todoSlice.ts";

interface FetchTodosError {
    message: string;
}

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: FetchTodosError }>(
    "todos/fetchTodos",
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
            return await response.json();
        } catch (err) {
            return rejectWithValue({
                message: err instanceof Error ? err.message : "An unknown error occurred",
            });
        }
    },
);
