export function parsePositivePage(value: string | null | undefined) {
  const page = Number.parseInt(value ?? "1", 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}
