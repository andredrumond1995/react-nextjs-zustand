"use client";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { name, setName } = useUserStore();
  const [input, setInput] = useState("");
  const [showChangeUser, setShowChangeUser] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setName(input.trim());
      setShowChangeUser(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white/80 rounded-xl shadow-xl p-8 flex flex-col items-center max-w-md w-full">
        <div className="flex w-full justify-end mb-2 gap-2">
          {name && (
            <button
              onClick={() => setShowChangeUser(true)}
              className="px-3 py-1 rounded bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition shadow"
              title="Change User"
            >
              Change User
            </button>
          )}
        </div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-4 animate-fade-in">
          Welcome to Test App with Next.js & Zustand
        </h1>
        {!name || showChangeUser ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full animate-fade-in">
            <label htmlFor="username" className="text-lg font-medium text-gray-700">What is your name?</label>
            <input
              id="username"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black placeholder-gray-500"
              placeholder="Enter your name..."
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow transition"
              >
                Save Name
              </button>
              {name && (
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 shadow transition"
                  onClick={() => setShowChangeUser(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <>
            <p className="text-xl text-gray-800 mb-6 animate-fade-in">
              Hello, <span className="font-bold text-blue-700">{name}</span>! 👋
            </p>
            <Link
              href="/todos"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 animate-bounce"
            >
              Go to Todo List
            </Link>
          </>
        )}
      </div>
      <footer className="mt-8 text-center text-gray-700 text-sm bg-white/90 rounded-lg shadow-lg px-4 py-3 mx-auto max-w-lg">
        <div className="mb-1 font-medium">This project uses <span className="font-semibold text-blue-700">Tailwind CSS</span>.</div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <span>Author: <span className="font-semibold">Andre Drumond</span> ·</span>
          <a
            href="https://www.linkedin.com/in/andre-drumond/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.71-.521-1.248-1.342-1.248-.822 0-1.358.538-1.358 1.248 0 .694.521 1.248 1.327 1.248h.015zm4.908 8.212V9.359c0-.216.016-.432.08-.586.175-.432.574-.88 1.243-.88.877 0 1.228.664 1.228 1.635v3.866h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.6 5.6 0 0 1 .016-.025V6.169h-2.4c.03.7 0 7.225 0 7.225h2.4z"/></svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/andredrumond1995"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
          <a
            href="https://www.youtube.com/@drumonddev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h-.002C3.635 1.999 0 2.484 0 7.999c0 5.515 3.635 6 8.049 6.001h.002c4.416 0 8.051-.485 8.051-6.001 0-5.515-3.635-6-8.051-6zm2.634 7.634-4.5 2.5A.5.5 0 0 1 5.5 11V5a.5.5 0 0 1 .785-.419l4.5 3a.5.5 0 0 1 0 .838z"/></svg>
            YouTube
          </a>
        </div>
      </footer>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease; }
        .animate-bounce { animation: bounce 1.2s infinite alternate; }
      `}</style>
    </main>
  );
}
