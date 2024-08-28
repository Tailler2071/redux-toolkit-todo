import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store/store.ts";
import {addTodo} from "./store/slices/todoSlice.ts";
import {fetchTodos} from "./store/asyncThunks/fetchTodos.ts";
import InputField from "./components/InputField/InputField.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import "./App.css";

const App: FC = () => {
    const [text, setText] = useState<string>("");
    const {status, error} = useSelector((state: RootState) => state.todos)
    const dispatch: AppDispatch = useDispatch();

    const addTask = () => {
        if (!text.trim().length) return;

        dispatch(addTodo({text}));
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
