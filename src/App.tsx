import "./App.css";
import {useState} from "react";
import {v4 as uuidv4} from "uuid";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

const App = () => {
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
        const nextTodo = todos.map(todo => {
            if (todo.id !== todoId) {
                return todo;
            }

            return {...todo, completed: !todo.completed};
        })

        setTodos(nextTodo);
    };

    const removeTodo = (todoId: string) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    };

    return (
        <div className="App">
            <div className="control">
                <label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                </label>
                <button onClick={addTodo}>Add Todo</button>
            </div>

            <ul className="list">
                {todos.map(todo => (
                    <li className="list-item" key={todo.id}>
                        <div>
                            <input
                                className="checkbox"
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodoComplete(todo.id)}
                            />
                            <span>{todo.text}</span>
                        </div>
                        <button className="delete" onClick={() => removeTodo(todo.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
