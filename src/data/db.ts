import { invoke } from "@tauri-apps/api/core";

export async function call<T = any>(
  command: string,
  args: Record<string, unknown> = {}
): Promise<T> {
  try {
    const result = await invoke<T>(command, args);
    return result;
  } catch (err) {
    console.error(`[DB] Error in command "${command}":`, err);
    throw err;
  }
}

export async function initDatabase() {
  try {
    const result = await invoke<string>("init_db");
    console.log("[DB] Initialization:", result);
  } catch (err) {
    console.error("[DB] Failed to initialize:", err);
  }
}
