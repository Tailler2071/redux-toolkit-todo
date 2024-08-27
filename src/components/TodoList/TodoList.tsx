import {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import TodoItem from "../TodoItem/TodoItem.tsx";

const TodoList: FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todosList);

    return (
        <ul className="list">
            {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
        </ul>
    );
};

export default TodoList;