import {FC} from "react";
import {TodoItemProps} from "./TodoItem.props.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {toggleStatus} from "../../store/asyncThunks/toggleStatus.ts";
import {deleteTodo} from "../../store/asyncThunks/deleteTodo.ts";

const TodoItem: FC<TodoItemProps> = ({id, completed, title}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await dispatch(deleteTodo(id)).unwrap();
        } catch (err) {
            console.error("Failed to delete the todo:", err);
        }
    };

    return (
        <li className="list-item">
            <div>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={completed}
                    onChange={() => dispatch(toggleStatus(id))}
                />
                <span>{title}</span>
            </div>
            <button
                className="delete"
                onClick={handleDelete}
            >
                ❌
            </button>
        </li>
    );
};

export default TodoItem;
