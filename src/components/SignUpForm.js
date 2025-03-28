import React from "react";

export default function SignUpForm({ handleLogin, email, setEmail, password, setPassword, loading }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center border border-gray-200">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">EmployWise</h1>
      <p className="text-gray-500 mb-4">Sign in to continue</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
