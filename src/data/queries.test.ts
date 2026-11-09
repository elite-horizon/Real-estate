import { demoDatabase } from "@/data/demo-database";
import { countAvailability, getAllProjects, getLandProjectPlots } from "@/data/queries";

describe("demo database", () => {
  it("contains the promised normalized inventory", () => {
    expect(Object.keys(demoDatabase.landProjects)).toHaveLength(4);
    expect(Object.keys(demoDatabase.apartmentProjects)).toHaveLength(4);
    expect(Object.keys(demoDatabase.houses)).toHaveLength(6);
    expect(Object.keys(demoDatabase.villaCommunities)).toHaveLength(3);
    expect(Object.keys(demoDatabase.plots).length).toBeGreaterThanOrEqual(40);
    expect(getAllProjects()).toHaveLength(17);
  });

  it("derives availability instead of storing counters", () => {
    const project = demoDatabase.landProjects["land-1"]!;
    const plots = getLandProjectPlots(project);
    const counts = countAvailability(plots);
    expect(counts.available + counts.reserved + counts.sold).toBe(plots.length);
  });
});
