import {FC} from "react";
import {RootState} from "../../store/store.ts";
import TodoItem from "../TodoItem/TodoItem.tsx";
import {useAppSelector} from "../../store/hooks/hooks.ts";

const TodoList: FC = () => {
    const todos = useAppSelector((state: RootState) => state.todos.todosList);

    return (
        <ul className="list">
            {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
        </ul>
    );
};

export default TodoList;