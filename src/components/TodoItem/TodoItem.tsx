import {FC} from "react";
import {TodoItemProps} from "./TodoItem.props.ts";
import {useDispatch} from "react-redux";
import {removeTodo, toggleTodoComplete} from "../../store/slices/todoSlice.ts";

const TodoItem: FC<TodoItemProps> = ({id, completed, title}) => {
    const dispatch = useDispatch();

    return (
        <li className="list-item">
            <div>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={completed}
                    onChange={() => dispatch(toggleTodoComplete({id}))}
                />
                <span>{title}</span>
            </div>
            <button
                className="delete"
                onClick={() => dispatch(removeTodo({id}))}
            >
                ❌
            </button>
        </li>
    );
};

export default TodoItem;
