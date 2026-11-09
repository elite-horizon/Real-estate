import { createStorageAdapter } from "@/lib/storage";

describe("storage adapter", () => {
  it("round-trips versioned values and tolerates invalid data", () => {
    const values = new Map<string, string>();
    const storage = {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => void values.set(key, value),
      removeItem: (key: string) => void values.delete(key),
    };
    const adapter = createStorageAdapter(storage);
    adapter.set("favorites", ["land-1"]);
    expect(adapter.get("favorites", [])).toEqual(["land-1"]);
    values.set("aurelis-demo:v1:broken", "not-json");
    expect(adapter.get("broken", ["fallback"])).toEqual(["fallback"]);
  });
});
