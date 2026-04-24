export const expenseFormStyles = {
  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap" as const,
    background: "#020617",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #1e293b",
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
  },

  button: {
    background: "#22c55e",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  // ✅ AGREGA ESTO 👇
  dropdown: {
    position: "absolute" as const,
    top: "100%",
    left: 0,
    right: 0,
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "6px",
    zIndex: 1000,
    maxHeight: "200px",
    overflowY: "auto" as const,
  },

  dropdownItem: {
    padding: "8px",
    cursor: "pointer",
    color: "white",
  },

  dropdownItemHover: {
    background: "#1e293b",
  },
};
