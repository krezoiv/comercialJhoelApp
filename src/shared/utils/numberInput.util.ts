export const validateDecimalInput = (
  value: string,
  previous: string = "",
): string | null => {
  // Permitir vacío
  if (value === "") return "";

  // Solo números y punto decimal
  if (!/^\d*\.?\d*$/.test(value)) return null;

  // Máximo 2 decimales
  if (value.includes(".")) {
    const [, decimals] = value.split(".");
    if (decimals.length > 2) return previous;
  }

  return value;
};
