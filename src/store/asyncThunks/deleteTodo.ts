import {createAsyncThunk} from "@reduxjs/toolkit";

interface DeleteTodoError {
    message: string;
}

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: DeleteTodoError }>(
    "todos/deleteTodo",
    async (id, {rejectWithValue}) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                return rejectWithValue({
                    message: `Failed to delete todo with id ${id}`,
                });
            }

            return id;
        } catch (err) {
            return rejectWithValue({
                message: err instanceof Error ? err.message : "An unknown error occurred",
            });
        }
    }
);
