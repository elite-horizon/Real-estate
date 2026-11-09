import { useCallback, useEffect, useState } from "react";
import { getBrowserStorage } from "@/lib/storage";

const KEY = "comparison";
const EVENT = "aurelis:comparison-changed";
const LIMIT = 3;

function readComparison() {
  return getBrowserStorage().get<string[]>(KEY, []);
}

export function useComparison() {
  const [comparison, setComparison] = useState<string[]>(readComparison);
  useEffect(() => {
    const sync = () => setComparison(readComparison());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  const toggleComparison = useCallback((id: string) => {
    const current = readComparison();
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : current.length < LIMIT
        ? [...current, id]
        : current;
    getBrowserStorage().set(KEY, next);
    window.dispatchEvent(new Event(EVENT));
    return next.includes(id);
  }, []);
  const clearComparison = useCallback(() => {
    getBrowserStorage().set(KEY, []);
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return {
    comparison,
    toggleComparison,
    clearComparison,
    isCompared: (id: string) => comparison.includes(id),
    isFull: comparison.length >= LIMIT,
  };
}
