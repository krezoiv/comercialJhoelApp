export const expenseRowStyles = {
  row: {
    borderBottom: "1px solid #1e293b",
    color: "white",
  },

  amount: (type: "credit" | "debit") => ({
    color: type === "credit" ? "#22c55e" : "#ef4444",
    fontWeight: "bold",
  }),
};
