export function formatCurrency(currency: number): string {
  return new Intl.NumberFormat(
    "pt-BR", {
      style: "currency",
      currency: "BRL",
    }
  ).format(currency);
}