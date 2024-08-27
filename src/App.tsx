import {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {addTodo} from "./store/slices/todoSlice.ts";
import InputField from "./components/InputField/InputField.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import "./App.css";

const App: FC = () => {
    const [text, setText] = useState<string>("");
    const dispatch = useDispatch();

    const addTask = () => {
        if (!text.trim().length) return;

        dispatch(addTodo({text}));
        setText("");
    };

    return (
        <div className="App">
            <InputField
                text={text}
                handleInput={setText}
                handleSubmit={addTask}
            />
            <TodoList/>
        </div>
    );
};

export default App;
