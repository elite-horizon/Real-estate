const STORAGE_PREFIX = "aurelis-demo";

interface StoredEnvelope<T> {
  version: number;
  value: T;
}

export interface StorageAdapter {
  get<T>(key: string, fallback: T): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}

export function createStorageAdapter(storage: Pick<Storage, "getItem" | "setItem" | "removeItem"> | undefined, version = 1): StorageAdapter {
  const fullKey = (key: string) => `${STORAGE_PREFIX}:v${version}:${key}`;
  return {
    get<T>(key: string, fallback: T): T {
      if (!storage) return fallback;
      try {
        const raw = storage.getItem(fullKey(key));
        if (!raw) return fallback;
        const parsed = JSON.parse(raw) as StoredEnvelope<T>;
        return parsed.version === version ? parsed.value : fallback;
      } catch {
        return fallback;
      }
    },
    set<T>(key: string, value: T) {
      if (!storage) return;
      storage.setItem(fullKey(key), JSON.stringify({ version, value } satisfies StoredEnvelope<T>));
    },
    remove(key: string) {
      storage?.removeItem(fullKey(key));
    },
  };
}

export function getBrowserStorage(): StorageAdapter {
  return createStorageAdapter(typeof window === "undefined" ? undefined : window.localStorage);
}
