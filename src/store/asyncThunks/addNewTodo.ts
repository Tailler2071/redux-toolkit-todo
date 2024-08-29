import {createAsyncThunk} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import {Todo} from "../slices/todoSlice.ts";

interface AddNewTodoError {
    message: string;
}

export const addNewTodo = createAsyncThunk<Todo, string, { rejectValue: AddNewTodoError }>(
    "todos/addNewTodo",
    async (text, {rejectWithValue}) => {
        try {
            const todo = {
                title: text,
                userId: 1,
                completed: false,
                id: uuidv4()
            };

            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo)
            });

            return await response.json();
        } catch (err) {
            return rejectWithValue({
                message: err instanceof Error ? err.message : "An unknown error occurred",
            });
        }
    }
);
