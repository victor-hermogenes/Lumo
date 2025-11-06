import { motion } from "framer-motion";

type Expense = {
  id: number;
  category: string;
  amount: number;
  description?: string;
  date: string;
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: number) => void;
};

export default function ExpenseItem({
  id,
  category,
  amount,
  description,
  date,
  onEdit,
  onDelete,
}: Expense) {
  return (
    <motion.tr
      key={id}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="border-b border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
    >
      <td className="p-2">{category}</td>
      <td className="p-2 text-right font-semibold">${amount.toFixed(2)}</td>
      <td className="p-2">{description || "-"}</td>
      <td className="p-2 text-center">
        {new Date(date).toLocaleDateString()}
      </td>

      {/* Future edit/delete controls */}
      {(onEdit || onDelete) && (
        <td className="p-2 text-center space-x-2">
          {onEdit && (
            <button
              onClick={() =>
                onEdit?.({ id, category, amount, description, date })
              }
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete?.(id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          )}
        </td>
      )}
    </motion.tr>
  );
}
