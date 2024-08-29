import {createAsyncThunk} from "@reduxjs/toolkit";
import {removeTodo} from "../slices/todoSlice.ts";

interface DeleteTodoError {
    message: string;
}

export const deleteTodo = createAsyncThunk<void, string, { rejectValue: DeleteTodoError }>(
    "todos/deleteTodo",
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                return rejectWithValue({
                    message: `Failed to delete todo with id ${id}`,
                });
            }

            dispatch(removeTodo({id}));
        } catch (err) {
            return rejectWithValue({
                message: err instanceof Error ? err.message : "An unknown error occurred",
            });
        }
    }
);
