export function calculateEmi(
  principal: number,
  annualRate: number,
  years: number,
) {
  if (principal <= 0 || years <= 0) return 0;
  const months = years * 12;
  const rate = annualRate / 1200;
  if (rate === 0) return principal / months;
  const growth = (1 + rate) ** months;
  return (principal * rate * growth) / (growth - 1);
}
