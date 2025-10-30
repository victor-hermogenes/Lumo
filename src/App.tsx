import { useState } from "react";
import { motion } from "framer-motion";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const { theme, setTheme, accent, setAccent } = useTheme();

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <motion.h1
        className="text-4xl font-bold text-center mt-8"
        style={{ color: `rgb(${accent}})` }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to Lumo ✨
      </motion.h1>

      <motion.div
        className="row mt-4 flex justify-center gap-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </motion.div>

      <p className="text-center mt-6 text-gray-600">
        Click on the Tauri, Vite, and React logos to learn more.
      </p>

      <form
        className="row mt-4 flex justify-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          className="border border-gray-300 rounded px-3 py-1"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button
          type="submit"
          className="text-white px-4 py-1 rounded transition"
          style={{
            backgroundColor: `rgb(${accent})`,
            boxShadow: `0 2px 6px rgba(${accent}, 0.4)`
          }}
        >
          Greet
        </button>
      </form>

      <motion.p
        className="text-center mt-4 text-lg text-green-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: greetMsg ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {greetMsg}
      </motion.p>
      <div className="flex gap-4 justify-center mt-8">
        <button
          className="px-4 py-2 rounded border"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>

        <input
          type="color"
          onChange={(e) => {
            const hex = e.target.value;
            const rgb = parseInt(hex.slice(1, 7), 16);
            const r = (rgb >> 16) & 255;
            const g = (rgb >> 8) & 255;
            const b = rgb & 255;
            setAccent(`${r} ${g} ${b}`);
          }}
          className="w-10 h-10 cursor-pointer border rounded"
          title="Pick accent color"
        />
      </div>

    </main>
  );
}

export default App;
