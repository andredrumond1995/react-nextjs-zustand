"use client";
import { useRouter } from "next/navigation";
import TodoForm from "@/components/todos/TodoForm";
import api from "@/services/api";
import { Todo } from "@/types/todo";
import { useState } from "react";
import Link from "next/link";

export default function NewTodoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (data: Omit<Todo, '_id' | 'created_at' | 'updated_at' | 'is_deleted'>) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/v1/todos", data);
      router.push("/todos");
    } catch {
      setError("Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 flex flex-col items-center max-w-xl w-full">
        <Link href="/todos" className="self-start mb-4 text-blue-600 hover:underline">← Back to Todos</Link>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Todo</h2>
        <TodoForm onSubmit={handleCreate} loading={loading} submitLabel="Create Todo" />
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </main>
  );
} 