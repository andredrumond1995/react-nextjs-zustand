"use client";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import api from "@/services/api";
import { Todo } from "@/types/todo";
import { useRouter } from "next/navigation";
import TodoItem from "@/components/todos/TodoItem";

export default function TodosPage() {
  const { name } = useUserStore();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
  const [hasMore, setHasMore] = useState(false);
  const [totalTodos, setTotalTodos] = useState(0);
  const [filter, setFilter] = useState("");
  const filterTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchTodos = async (customPage?: number, customFilter?: string) => {
    setLoading(true);
    setError("");
    try {
      const currentPage = customPage ?? page;
      const skip = (currentPage - 1) * PAGE_SIZE;
      const filterValue = customFilter !== undefined ? customFilter : filter;
      const filterQuery = filterValue ? `&$filter=contains('title', '${encodeURIComponent(filterValue)}')` : "";
      const res = await api.get(`/v1/todos?$skip=${skip}&$top=${PAGE_SIZE}${filterQuery}`);
      setTodos(res.data.data.items);
      setHasMore(res.data.data.items.length === PAGE_SIZE);
      setTotalTodos(res.data.data.totalItems);
    } catch (err: unknown) {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  // Debounce para filtro
  useEffect(() => {
    if (filterTimeout.current) clearTimeout(filterTimeout.current);
    filterTimeout.current = setTimeout(() => {
      fetchTodos(1, filter);
      setPage(1);
    }, 400);
    return () => {
      if (filterTimeout.current) clearTimeout(filterTimeout.current);
    };
  }, [filter]);

  const handleToggleComplete = async (todo: Todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      const res = await api.put(`/v1/todos/${todo._id}`, updatedTodo);
      setTodos((prev) => prev.map(t => t._id === todo._id ? res.data.data : t));
    } catch {
      setError("Failed to update todo status");
    }
  };

  const handleDelete = async (todo: Todo) => {
    try {
      const res = await api.put(`/v1/todos/${todo._id}`, { is_deleted: true });
      setTodos((prev) => prev.map(t => t._id === todo._id ? res.data.data : t));
    } catch {
      setError("Failed to delete todo");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600">
      <div className="bg-white/90 rounded-xl shadow-xl p-8 flex flex-col items-center max-w-2xl w-full">
        <div className="flex w-full justify-between items-center mb-6">
          <span className="text-lg font-semibold text-blue-700">User: {name}</span>
          <Link
            href="/"
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-4 py-2 rounded transition"
          >
            Back to Home
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Todo List</h2>
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <span className="text-gray-700 font-medium">Total todos: {totalTodos}</span>
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Filter by title..."
            className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500 mr-2 w-48"
          />
          <button
            onClick={() => fetchTodos()}
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition shadow mr-2"
            title="Reload Todos"
          >
            Reload Todos
          </button>
          <Link
            href="/todos/new"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded transition self-start"
          >
            + Add Todo
          </Link>
        </div>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <ul className="w-full flex flex-col gap-2">
              {todos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onEdit={() => router.push(`/todos/${todo._id}`)}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
            <div className="flex justify-between items-center w-full mt-6">
              <button
                className="px-5 py-2 rounded-lg font-semibold border border-gray-300 shadow-sm bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="text-gray-700 font-medium">Page {page}</span>
              <button
                className="px-5 py-2 rounded-lg font-semibold border border-gray-300 shadow-sm bg-white text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMore}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 