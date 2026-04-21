export const formatMoney = (value: number) => {
  return value.toLocaleString("es-GT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
