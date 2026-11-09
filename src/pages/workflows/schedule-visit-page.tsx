import { CalendarCheck2, CheckCircle2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DemoNotice } from "@/components/demo-notice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getAllProjects } from "@/data/queries";
import { useDemoActivity } from "@/hooks/use-demo-activity";
import { Field, WorkflowHeader } from "@/pages/shared/workflow-shared";

export function ScheduleVisitPage() {
  const projects = getAllProjects();
  const [params] = useSearchParams();
  const [complete, setComplete] = useState(false);
  const { addActivity } = useDemoActivity();
  const [minDate] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = String(data.get("property"));
    const property = projects.find((item) => item.id === id);
    addActivity({
      kind: "visit",
      propertyId: id,
      propertyLabel: property?.name ?? "Selected property",
      detail: `${String(data.get("date"))} · ${String(data.get("time"))}`,
    });
    setComplete(true);
  }
  return (
    <main>
      <WorkflowHeader
        eyebrow="Private viewing"
        title="Plan a site visit."
        description="Choose a fictional project and preferred time. This demonstration records no real appointment."
      />
      <section className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {complete ? (
            <Card className="p-8 text-center">
              <CheckCircle2
                className="mx-auto text-success"
                aria-hidden="true"
                size={42}
              />
              <p className="mt-5 eyebrow">Simulated confirmation</p>
              <h2 className="mt-3 font-display text-3xl">
                Your demo visit preference is saved.
              </h2>
              <p className="mt-3 text-sm text-muted">
                No appointment was booked and no representative was notified.
              </p>
              <Button className="mt-6" asChild>
                <Link to="/saved">View saved dashboard</Link>
              </Button>
            </Card>
          ) : (
            <Card className="p-6 sm:p-8">
              <DemoNotice>
                This is a frontend simulation, not a confirmed site appointment.
              </DemoNotice>
              <form
                className="mt-7 grid gap-5 sm:grid-cols-2"
                onSubmit={submit}
              >
                <div className="sm:col-span-2">
                  <Field label="Property">
                    <Select
                      name="property"
                      defaultValue={params.get("property") ?? ""}
                      required
                    >
                      <option value="" disabled>
                        Select a property
                      </option>
                      {projects.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} · {item.city}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>
                <Field label="Preferred date">
                  <Input name="date" type="date" min={minDate} required />
                </Field>
                <Field label="Preferred time">
                  <Select name="time" defaultValue="">
                    <option value="" disabled>
                      Select a time
                    </option>
                    <option>10:00 AM</option>
                    <option>12:30 PM</option>
                    <option>3:00 PM</option>
                    <option>5:00 PM</option>
                  </Select>
                </Field>
                <Field label="Full name">
                  <Input name="name" autoComplete="name" required />
                </Field>
                <Field label="Phone">
                  <Input name="phone" type="tel" autoComplete="tel" required />
                </Field>
                <label className="flex gap-3 text-sm leading-6 text-muted sm:col-span-2">
                  <input
                    className="mt-1 size-4 accent-gold"
                    type="checkbox"
                    required
                  />
                  I understand this is a simulated request only.
                </label>
                <Button className="sm:col-span-2 sm:w-fit" type="submit">
                  <CalendarCheck2 aria-hidden="true" size={17} />
                  Save visit preference
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}
