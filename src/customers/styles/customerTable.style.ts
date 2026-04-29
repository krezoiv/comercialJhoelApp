export const styles = {
  container: {
    marginTop: "24px",
    padding: "16px",
    background: "rgba(15, 23, 42, 0.6)",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  },

  title: {
    color: "#fff",
    marginBottom: "12px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },

  th: {
    textAlign: "left" as const,
    padding: "10px",
    borderBottom: "1px solid #334155",
    color: "#94a3b8",
  },

  td: {
    padding: "10px",
    borderBottom: "1px solid #1e293b",
    color: "#e2e8f0",
  },

  tr: {
    transition: "0.2s",
  },

  loading: {
    color: "#94a3b8",
  },

  empty: {
    textAlign: "center" as const,
    padding: "16px",
    color: "#64748b",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  editBtn: {
    background: "#3b82f6",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
