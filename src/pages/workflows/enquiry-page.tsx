import { CheckCircle2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DemoNotice } from "@/components/demo-notice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDemoActivity } from "@/hooks/use-demo-activity";
import { resolvePropertyReference } from "@/lib/property-reference";
import {
  Field,
  textareaClass,
  WorkflowHeader,
} from "@/pages/shared/workflow-shared";

export function EnquiryPage() {
  const { propertyType, propertyId } = useParams();
  const property = resolvePropertyReference(propertyType, propertyId);
  const [complete, setComplete] = useState(false);
  const { addActivity } = useDemoActivity();
  if (!property)
    return (
      <main>
        <WorkflowHeader
          eyebrow="Unavailable reference"
          title="We could not find that property."
          description="The requested property is not part of the demonstration inventory."
        />
        <section className="container-page py-12">
          <Button asChild>
            <Link to="/properties">Return to properties</Link>
          </Button>
        </section>
      </main>
    );
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addActivity({
      kind: "enquiry",
      propertyId: property!.id,
      propertyLabel: property!.label,
      detail: `Preferred contact: ${String(data.get("contact"))}`,
    });
    setComplete(true);
  }
  return (
    <main>
      <WorkflowHeader
        eyebrow="Property enquiry"
        title="Start a private conversation."
        description={`Share your preferences for ${property.label}. No information leaves this browser in this frontend demonstration.`}
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
                Your demo enquiry has been saved.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                No message was sent. You can review this local activity in the
                saved dashboard.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button asChild>
                  <Link to="/saved">View saved dashboard</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to={property.path}>Return to property</Link>
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 sm:p-8">
              <DemoNotice>
                Simulated form only. Do not enter sensitive personal or
                financial information.
              </DemoNotice>
              <form
                className="mt-7 grid gap-5 sm:grid-cols-2"
                onSubmit={submit}
              >
                <Field label="Full name">
                  <Input name="name" autoComplete="name" required />
                </Field>
                <Field label="Email">
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </Field>
                <Field label="Phone">
                  <Input name="phone" type="tel" autoComplete="tel" required />
                </Field>
                <Field label="Preferred contact">
                  <select
                    name="contact"
                    className="h-12 w-full rounded border border-border bg-surface px-3.5 text-sm"
                    defaultValue="Phone"
                  >
                    <option>Phone</option>
                    <option>Email</option>
                    <option>WhatsApp</option>
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="What would you like to know?">
                    <textarea
                      className={textareaClass}
                      name="message"
                      required
                    />
                  </Field>
                </div>
                <label className="flex gap-3 text-sm leading-6 text-muted sm:col-span-2">
                  <input
                    className="mt-1 size-4 accent-gold"
                    type="checkbox"
                    required
                  />
                  I understand this creates only a simulated local confirmation.
                </label>
                <Button className="sm:col-span-2 sm:w-fit" type="submit">
                  Save demo enquiry
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}
