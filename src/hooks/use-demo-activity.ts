import { useLocalStorage } from "@/hooks/use-local-storage";

export interface DemoActivity {
  id: string;
  kind: "enquiry" | "visit";
  propertyId?: string;
  propertyLabel: string;
  createdAt: string;
  detail: string;
}

export function useDemoActivity() {
  const [activity, setActivity] = useLocalStorage<DemoActivity[]>(
    "activity",
    [],
  );
  function addActivity(item: Omit<DemoActivity, "id" | "createdAt">) {
    setActivity((current) =>
      [
        {
          ...item,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
        ...current,
      ].slice(0, 20),
    );
  }
  function clearActivity() {
    setActivity([]);
  }
  return { activity, addActivity, clearActivity };
}
