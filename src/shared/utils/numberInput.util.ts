export const validateDecimalInput = (value: string): string | null => {
  // permitir vacío
  if (value === "") return "";

  // solo números y decimal
  if (!/^\d*\.?\d*$/.test(value)) {
    return null;
  }

  // máximo 2 decimales
  const parts = value.split(".");

  if (parts[1] && parts[1].length > 2) {
    return null;
  }

  return value;
};
