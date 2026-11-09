import { useCallback, useState } from "react";
import { getBrowserStorage } from "@/lib/storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => getBrowserStorage().get(key, initialValue));

  const updateValue = useCallback((next: T | ((current: T) => T)) => {
    setValue((current) => {
      const resolved = typeof next === "function" ? (next as (current: T) => T)(current) : next;
      getBrowserStorage().set(key, resolved);
      return resolved;
    });
  }, [key]);

  return [value, updateValue] as const;
}
