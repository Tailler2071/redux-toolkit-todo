import {FC, useState} from "react";
import {v4 as uuidv4} from "uuid";
import InputField from "./components/InputField/InputField.tsx";
import TodoList from "./components/TodoList/TodoList.tsx";
import "./App.css";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

const App: FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState<string>("");

    const addTodo = () => {
        if (!text.trim().length) return;

        const newTodo: Todo = {
            id: uuidv4(),
            text,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setText("");
    };

    const toggleTodoComplete = (todoId: string) => {
        const nextTodo = todos.map(todo =>
            todo.id !== todoId ? todo : {...todo, completed: !todo.completed}
        );

        setTodos(nextTodo);
    };

    const removeTodo = (todoId: string) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    };

    return (
        <div className="App">
            <InputField
                text={text}
                handleInput={setText}
                handleSubmit={addTodo}
            />
            <TodoList
                todos={todos}
                toggleTodoComplete={toggleTodoComplete}
                removeTodo={removeTodo}
            />
        </div>
    );
};

export default App;
