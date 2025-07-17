"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TodoForm from "@/components/todos/TodoForm";
import api from "@/services/api";
import { Todo } from "@/types/todo";
import Link from "next/link";

export default function EditTodoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/v1/todos/${id}`)
      .then(res => setTodo(res.data.data))
      .catch(() => setError("Failed to fetch todo"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (data: Omit<Todo, '_id' | 'created_at' | 'updated_at' | 'is_deleted'>) => {
    setSaving(true);
    setError("");
    try {
      await api.put(`/v1/todos/${id}`, data);
      router.push("/todos");
    } catch {
      setError("Failed to update todo");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!todo) return <div className="min-h-screen flex items-center justify-center">Todo not found</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 flex flex-col items-center max-w-xl w-full">
        <Link href="/todos" className="self-start mb-4 text-blue-600 hover:underline">← Back to Todos</Link>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Todo</h2>
        <TodoForm initialData={todo} onSubmit={handleUpdate} loading={saving} submitLabel="Update Todo" />
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </main>
  );
} 