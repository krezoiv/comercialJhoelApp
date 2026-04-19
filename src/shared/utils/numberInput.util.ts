export const validateDecimalInput = (
  newValue: string,
  prevValue: string,
): string => {
  // permitir vacío (para borrar)
  if (newValue === "") return "";

  // ❌ no negativos
  if (newValue.startsWith("-")) return prevValue;

  // 🔥 solo números y punto
  if (!/^\d*\.?\d*$/.test(newValue)) return prevValue;

  // 🔥 máximo 2 decimales
  const parts = newValue.split(".");
  if (parts.length === 2 && parts[1].length > 2) return prevValue;

  return newValue;
};
