import { useState } from "react";
import { motion } from "framer-motion";
import { invoke } from "@tauri-apps/api/core";

export default function ExpenseForm({ onAdded }: { onAdded: () => void }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!category || !amount || !date) {
      setError("Please fill all required fields.");
      return;
    }
    if (isNaN(Number(amount))) {
      setError("Amount must be a number.");
      return;
    }

    try {
      setLoading(true);
      await invoke("add_expense", {
        category,
        amount: parseFloat(amount),
        description,
        date,
      });

      setCategory("");
      setAmount("");
      setDescription("");
      setDate("");
      onAdded?.();
    } catch (err) {
      console.error(err);
      setError("Failed to add expense.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md space-y-3 max-w-md mx-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
        Add New Expense
      </h2>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-800"
      />

      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-800"
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-800"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-neutral-800"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </motion.form>
  );
}
