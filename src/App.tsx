import {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./store/hooks/hooks.ts";
import {AppDispatch, RootState} from "./store/store.ts";
import {fetchTodos} from "./store/asyncThunks/fetchTodos.ts";
import {addNewTodo} from "./store/asyncThunks/addNewTodo.ts";
import InputField from "./components/InputField/InputField.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import "./App.css";

const App: FC = () => {
    const [text, setText] = useState<string>("");
    const {status, error} = useAppSelector((state: RootState) => state.todos)
    const dispatch: AppDispatch = useAppDispatch();

    const addTask = () => {
        if (!text.trim().length) return;

        dispatch(addNewTodo(text));
        setText("");
    };

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className="App">
            <InputField
                text={text}
                handleInput={setText}
                handleSubmit={addTask}
            />

            {status === "loading" && <h2>Loading...</h2>}
            {error && <h2>Error: {error.message}</h2>}

            <TodoList/>
        </div>
    );
};

export default App;
