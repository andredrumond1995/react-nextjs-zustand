import { useState, useEffect } from "react";
import { Todo, Priority } from "@/types/todo";

interface TodoFormProps {
  initialData?: Partial<Todo>;
  onSubmit: (data: Omit<Todo, '_id' | 'created_at' | 'updated_at' | 'is_deleted'>) => void;
  loading?: boolean;
  submitLabel?: string;
}

const priorities: Priority[] = ["low", "medium", "high"];

export default function TodoForm({ initialData = {}, onSubmit, loading, submitLabel = "Save" }: TodoFormProps) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(initialData.due_date ? initialData.due_date.slice(0, 10) : "");
  const [priority, setPriority] = useState<Priority | "">(initialData.priority || "");

  useEffect(() => {
    if (initialData && initialData.title) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDueDate(initialData.due_date ? initialData.due_date.slice(0, 10) : "");
      setPriority(initialData.priority || "");
    }
    // Não faz nada se for criação
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      due_date: dueDate ? new Date(dueDate).toISOString() : undefined,
      priority: priority || undefined,
      completed: initialData.completed ?? false,
      user_id: initialData.user_id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        type="text"
        className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
      />
      <div className="flex gap-2">
        <input
          type="date"
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
        >
          <option value="">Priority</option>
          {priorities.map(p => (
            <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition shadow-lg disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
} 