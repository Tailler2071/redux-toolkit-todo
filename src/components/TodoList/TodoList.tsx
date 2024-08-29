import {FC} from "react";
import TodoItem from "../TodoItem/TodoItem.tsx";
import {useAppSelector} from "../../store/hooks/hooks.ts";
import {selectAllTodos} from "../../store/slices/todoSlice.ts";

const TodoList: FC = () => {
    const todos = useAppSelector(selectAllTodos);

    return (
        <ul className="list">
            {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
        </ul>
    );
};

export default TodoList;