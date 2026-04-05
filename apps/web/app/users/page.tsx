"use client";
import React, { useState, useEffect } from "react";

export default function UsersTestPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: name, details }),
      });
      setName("");
      setDetails("");
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 md:p-8 flex flex-col items-center justify-start font-sans">
      <div className="max-w-3xl w-full bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 md:p-10 mb-8 mt-10">
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          User Management
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400 uppercase tracking-wider">User Name</label>
            <input
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-neutral-600"
              placeholder="e.g. John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400 uppercase tracking-wider">Details</label>
            <textarea
              value={details}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetails(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all min-h-[120px] placeholder:text-neutral-600 resize-none"
              placeholder="Enter some cool details about this user..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-[0.98]"
          >
            {loading ? "Creating User..." : "Add New User"}
          </button>
        </form>
      </div>

      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Registered Users</h2>
          <span className="bg-neutral-800 text-cyan-400 py-1 px-3 rounded-full text-sm font-semibold border border-neutral-700">
            Total: {users.length}
          </span>
        </div>
        
        <div className="space-y-4">
          {users.length === 0 ? (
            <div className="text-center py-12 bg-neutral-900/50 border border-dashed border-neutral-700/50 rounded-2xl text-neutral-500">
              No users found. Create your first user above!
            </div>
          ) : (
            users.map((u: any) => (
              <div key={u.id} className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(6,182,212,0.05)] flex flex-col gap-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {u.user_name}
                  </h3>
                  <div className="text-xs font-mono text-neutral-500 bg-neutral-950 px-2 py-1 rounded-md border border-neutral-800">
                    {new Date(u.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{u.details}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
