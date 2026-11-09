import { Calculator } from "lucide-react";
import { useMemo, useState } from "react";
import { DemoNotice } from "@/components/demo-notice";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateEmi } from "@/lib/finance";
import { formatPrice } from "@/lib/formatters";
import { Field, WorkflowHeader } from "@/pages/shared/workflow-shared";

export function EmiCalculatorPage() {
  const [price, setPrice] = useState(20_000_000);
  const [downPayment, setDownPayment] = useState(4_000_000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const principal = Math.max(0, price - downPayment);
  const emi = useMemo(
    () => calculateEmi(principal, rate, years),
    [principal, rate, years],
  );
  const total = emi * years * 12;
  return (
    <main>
      <WorkflowHeader
        eyebrow="Illustrative finance"
        title="Understand the monthly picture."
        description="Explore a simple reducing-balance EMI example. It is not a loan offer or financial advice."
      />
      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
          <Card className="p-6 sm:p-8">
            <DemoNotice>
              Illustrative calculation only. Actual eligibility, rates, fees,
              taxes, and repayments vary by lender.
            </DemoNotice>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Property price (₹)">
                <Input
                  type="number"
                  min="100000"
                  step="100000"
                  value={price}
                  onChange={(event) => setPrice(Number(event.target.value))}
                />
              </Field>
              <Field label="Down payment (₹)">
                <Input
                  type="number"
                  min="0"
                  max={price}
                  step="100000"
                  value={downPayment}
                  onChange={(event) =>
                    setDownPayment(Number(event.target.value))
                  }
                />
              </Field>
              <Field label="Interest rate (% per year)">
                <Input
                  type="number"
                  min="0"
                  max="30"
                  step="0.1"
                  value={rate}
                  onChange={(event) => setRate(Number(event.target.value))}
                />
              </Field>
              <Field label="Loan term (years)">
                <Input
                  type="number"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(event) => setYears(Number(event.target.value))}
                />
              </Field>
            </div>
          </Card>
          <aside>
            <Card className="p-7">
              <Calculator
                className="text-gold-strong"
                aria-hidden="true"
                size={28}
              />
              <p className="mt-6 eyebrow">Estimated monthly EMI</p>
              <output
                className="mt-2 block text-4xl font-bold tabular-nums text-foreground"
                aria-live="polite"
              >
                {formatPrice(Math.round(emi))}
              </output>
              <dl className="mt-6 space-y-4 border-t border-border pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Loan principal</dt>
                  <dd className="font-semibold">{formatPrice(principal)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Total repayment</dt>
                  <dd className="font-semibold">
                    {formatPrice(Math.round(total))}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Interest over term</dt>
                  <dd className="font-semibold">
                    {formatPrice(Math.max(0, Math.round(total - principal)))}
                  </dd>
                </div>
              </dl>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
