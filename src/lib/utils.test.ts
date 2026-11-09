import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges conditional classes and resolves Tailwind conflicts", () => {
    const isHidden = false;
    expect(cn("px-2", isHidden ? "hidden" : undefined, "px-4")).toBe("px-4");
  });
});
