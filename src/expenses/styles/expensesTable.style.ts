import type { CSSProperties } from "react";

export const expensesTableStyles: Record<string, CSSProperties> = {
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

    letterSpacing: ".3px",
  },

  td: {
    padding: "18px",
    textAlign: "center",

    color: "white",

    borderBottom: "1px solid rgba(255,255,255,0.04)",

    transition: "all 0.2s ease",
  },

  row: {
    transition: "all .25s cubic-bezier(.4,0,.2,1)",

    cursor: "default",
  },

  rowHover: {
    background: "rgba(15,23,42,.95)",

    transform: "translateY(-2px) scale(1.003)",

    boxShadow: `
    inset 0 1px 0 rgba(255,255,255,.03),
    0 0 25px rgba(59,130,246,.08)
  `,
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
  },

  actionBtn: {
    cursor: "pointer",

    fontSize: "15px",

    transition: "all .22s ease",

    padding: "10px 14px",

    borderRadius: "12px",

    background: "rgba(255,255,255,.04)",

    border: "1px solid rgba(255,255,255,.05)",

    backdropFilter: "blur(10px)",

    boxShadow: "0 10px 20px rgba(0,0,0,.25)",

    color: "white",
  },

  actionBtnHover: {
    transform: "translateY(-2px) scale(1.05)",

    background: "rgba(255,255,255,.08)",

    boxShadow: `
    0 0 20px rgba(59,130,246,.18),
    0 12px 25px rgba(0,0,0,.35)
  `,
  },

  input: {
    padding: "14px 18px",

    borderRadius: "16px",

    border: "1px solid rgba(255,255,255,.06)",

    background: "rgba(15,23,42,.82)",

    color: "white",

    outline: "none",

    fontSize: "14px",

    transition: "all .25s cubic-bezier(.4,0,.2,1)",

    minWidth: "180px",

    boxShadow: `
    inset 0 1px 0 rgba(255,255,255,.02),
    0 10px 30px rgba(0,0,0,.25)
  `,
  },

  inputFocus: {
    border: "1px solid #38bdf8",

    boxShadow: `
    0 0 0 4px rgba(56,189,248,.10),
    0 0 20px rgba(56,189,248,.25)
  `,

    transform: "scale(1.015)",
  },

  viewButton: {
    background: "linear-gradient(135deg,#1e3a8a,#2563eb)",

    border: "1px solid rgba(255,255,255,.06)",

    color: "white",

    padding: "10px 18px",

    borderRadius: "14px",

    cursor: "pointer",

    fontWeight: 600,

    transition: "all .25s ease",

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

    transition: "all .25s ease",

    boxShadow: "0 0 18px rgba(250,204,21,.12)",
  },
};
