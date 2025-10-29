import { AnimatePresence, motion } from "framer-motion";
import { slideIn } from "@/lib/motion";
export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <AnimatePresence mode="wait">
        <motion.main key={"route-key"} variants={slideIn} initial="hidden" animate="show" exit="exit" className="p-6">
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
