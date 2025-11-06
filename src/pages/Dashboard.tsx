import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { classes } from "../modules/shared/utils/classNames";
import { defaultTheme } from "../modules/shared/utils/themeTokens";

export default function Home() {
  const { theme } = useTheme();
  const c = classes(defaultTheme); 

  const cards = [
    { title: "Total Balance", value: "$8,450", color: "bg-green-500" },
    { title: "Income (This Month)", value: "$2,350", color: "bg-blue-500" },
    { title: "Expenses (This Month)", value: "$1,820", color: "bg-red-500" },
  ];

  return (
    <main className={c.container}>
      <motion.h1
        className={c.sectionTitle + " text-3xl font-bold text-center"}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Welcome to <span className="text-blue-500">Lumo</span>
      </motion.h1>

      <p className={c.emptyState + " text-base"}>
        Your personal finance dashboard at a glance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className={c.card}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {card.title}
            </h3>
            <p className="text-2xl font-bold">{card.value}</p>
            <div className={`mt-3 h-1 w-full rounded-full ${card.color}`} />
          </motion.div>
        ))}
      </div>

      <div className={c.divider} />

      <div className="flex justify-center gap-4 mt-4">
        <button className={c.buttonPrimary}>Add Expense</button>
        <button className={c.buttonSecondary}>View Reports</button>
      </div>
    </main>
  );
}
