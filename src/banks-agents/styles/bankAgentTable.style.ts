import type { CSSProperties } from "react";

export const bankAgentTableStyles: Record<string, CSSProperties> = {
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,

    background: "rgba(2,6,23,.82)",

    backdropFilter: "blur(24px)",

    borderRadius: "28px",

    overflow: "hidden",

    border: "1px solid rgba(255,255,255,.05)",

    boxShadow: `
      0 25px 70px rgba(0,0,0,.72),
      inset 0 1px 0 rgba(255,255,255,.03)
    `,
  },

  thead: {
    background: "rgba(30,41,59,0.92)",
    color: "#94a3b8",
  },

  th: {
    padding: "18px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 700,
  },

  td: {
    padding: "18px",
    textAlign: "center",
    color: "white",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },

  row: {
    transition: "all .25s ease",
    cursor: "default",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
  },

  viewButton: {
    background: "linear-gradient(135deg,#1e3a8a,#2563eb)",

    border: "1px solid rgba(255,255,255,.06)",

    color: "white",

    padding: "10px 18px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: 600,

    boxShadow: "0 0 18px rgba(59,130,246,.25)",
  },

  editButton: {
    background: "linear-gradient(135deg,#3f3f46,#52525b)",

    border: "1px solid rgba(255,255,255,.06)",

    color: "#facc15",

    padding: "10px 18px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: 600,
  },
};
