import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {toggleTodoComplete} from "../slices/todoSlice.ts";

interface ToggleStatusError {
    message: string;
}

export const toggleStatus = createAsyncThunk<void, string, { rejectValue: ToggleStatusError, state: RootState }>(
    "todos/toggleStatus",
    async (id, {rejectWithValue, dispatch, getState}) => {
        const todo = getState().todos.todosList.find(todo => todo.id === id);

        if (!todo) {
            return rejectWithValue({message: `Todo with id ${id} not found`});
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            });

            if (!response.ok) {
                return rejectWithValue({
                    message: `Failed to delete todo with id ${id}`,
                });
            }

            dispatch(toggleTodoComplete({id}));
        } catch (err) {
            return rejectWithValue({
                message: err instanceof Error ? err.message : "An unknown error occurred",
            });
        }
    }
);
