import { call } from "./db";

export interface Setting {
  key: string;
  value: string;
}

export async function getSettings(): Promise<Setting[]> {
  return call("get_settings");
}

export async function updateSetting(key: string, value: string) {
  return call("update_settings", { key, value });
}

export async function resetSettings() {
  return call("reset_settings");
}
