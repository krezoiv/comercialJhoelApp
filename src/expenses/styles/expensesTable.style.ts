export const expensesTableStyles = {
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    background: "#020617",
    borderRadius: "12px",
    overflow: "hidden",
  },

  thead: {
    background: "#1e293b",
    color: "#94a3b8",
  },

  th: {
    padding: "14px",
    textAlign: "center" as const, // 🔥 centrado
    fontSize: "14px",
    fontWeight: "600",
  },

  td: {
    padding: "14px",
    textAlign: "center" as const, // 🔥 centrado
    color: "white",
    borderBottom: "1px solid #1e293b",
  },

  row: {
    transition: "background 0.2s",
    cursor: "default",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px", // 🔥 separación entre botones
  },

  actionBtn: {
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform 0.1s",
  },
};
