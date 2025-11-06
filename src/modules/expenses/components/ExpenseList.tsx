import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invoke } from "@tauri-apps/api/core";

type Expense = {
  id: number;
  category: string;
  amount: number;
  description?: string;
  date: string;
};

export default function ExpenseList({ refreshFlag }: { refreshFlag: number }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExpenses() {
      setLoading(true);
      setError("");

      try {
        const result = await invoke<Expense[]>("list_expenses");
        setExpenses(result || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load expenses.");
      } finally {
        setLoading(false);
      }
    }

    loadExpenses();
  }, [refreshFlag]); // Reload when a new expense is added

  if (loading) {
    return <p className="text-center text-gray-500">Loading expenses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (expenses.length === 0) {
    return <p className="text-center text-gray-500">No expenses yet.</p>;
  }

  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-center mb-3 text-gray-800 dark:text-gray-100">
        Expense List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-neutral-900 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-right">Amount</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-center">Date</th>
            </tr>
          </thead>
          <AnimatePresence initial={false}>
            <tbody>
              {expenses.map((exp) => (
                <motion.tr
                  key={exp.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                >
                  <td className="p-2">{exp.category}</td>
                  <td className="p-2 text-right font-semibold">
                    ${exp.amount.toFixed(2)}
                  </td>
                  <td className="p-2">{exp.description || "-"}</td>
                  <td className="p-2 text-center">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </table>
      </div>
    </div>
  );
}
