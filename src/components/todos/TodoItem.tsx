import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onToggleComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export default function TodoItem({ todo, onEdit, onToggleComplete, onDelete }: TodoItemProps) {
  return (
    <li className={`flex items-center justify-between rounded-lg px-4 py-3 shadow border border-gray-200 mb-2 transition hover:shadow-md ${todo.is_deleted ? 'bg-gray-200' : 'bg-white'}`}>
      <div className="flex-1 min-w-0">
        <span className={todo.completed ? "line-through text-gray-400" : "font-semibold text-gray-800"}>
          {todo.title}
        </span>
        {todo.priority && (
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${
            todo.priority === 'high' ? 'bg-red-200 text-red-700' : todo.priority === 'medium' ? 'bg-yellow-200 text-yellow-700' : 'bg-green-200 text-green-700'
          }`}>
            {todo.priority}
          </span>
        )}
        {todo.due_date && (
          <span className="ml-2 text-xs text-gray-500">Due: {new Date(todo.due_date).toLocaleDateString()}</span>
        )}
        {todo.is_deleted && (
          <span className="ml-2 text-xs font-bold text-red-600">[Deleted]</span>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onToggleComplete(todo)}
          className={`px-2 py-1 rounded text-xs font-bold transition border border-gray-300 shadow-sm ${todo.completed ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-50 text-gray-700 hover:bg-green-100'} ${todo.is_deleted ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          disabled={todo.is_deleted}
        >
          {todo.completed ? "✓" : "○"}
        </button>
        <button
          onClick={() => onEdit(todo)}
          className={`px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 border border-gray-300 shadow-sm transition ${todo.is_deleted ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Edit"
          disabled={todo.is_deleted}
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(todo)}
          className={`px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 border border-gray-300 shadow-sm transition ${todo.is_deleted ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Delete"
          disabled={todo.is_deleted}
        >
          🗑
        </button>
      </div>
    </li>
  );
} 