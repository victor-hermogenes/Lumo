import { useState } from "react";
import { motion } from "framer-motion";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <motion.h1
        className="text-4xl font-bold text-center mt-8 text-blue-500"
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
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
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
    </main>
  );
}

export default App;
