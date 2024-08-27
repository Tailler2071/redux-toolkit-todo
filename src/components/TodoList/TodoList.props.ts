interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export interface TodoListProps {
    todos: Todo[];
    removeTodo: (id: string) => void;
    toggleTodoComplete: (id: string) => void;
}
