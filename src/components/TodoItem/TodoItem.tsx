import {FC} from "react";
import {TodoItemProps} from "./TodoItem.props.ts";

const TodoItem: FC<TodoItemProps> = ({id, completed, text, toggleTodoComplete, removeTodo}) => {
    return (
        <li className="list-item" key={id}>
            <div>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleTodoComplete(id)}
                />
                <span>{text}</span>
            </div>
            <button className="delete" onClick={() => removeTodo(id)}>❌</button>
        </li>
    );
};

export default TodoItem;
