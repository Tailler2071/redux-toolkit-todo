export interface TodoItemProps {
    id: string;
    completed: boolean;
    text: string;
    toggleTodoComplete: (id: string) => void;
    removeTodo: (id: string) => void;
}
