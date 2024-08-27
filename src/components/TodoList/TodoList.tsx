import {FC} from "react";
import {TodoListProps} from "./TodoList.props.ts";
import TodoItem from "../TodoItem/TodoItem.tsx";

const TodoList: FC<TodoListProps> = ({todos, removeTodo, toggleTodoComplete}) => {
    return (
        <ul className="list">
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    removeTodo={removeTodo}
                    toggleTodoComplete={toggleTodoComplete}
                    {...todo}
                />
            ))}
        </ul>
    );
};

export default TodoList;