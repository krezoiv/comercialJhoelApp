import type { CSSProperties } from "react";

export const bankAgentPageStyles: Record<string, CSSProperties> = {
  container: {
    minHeight: "100vh",
    padding: "20px",
  },

  inner: {
    padding: "20px",
    maxWidth: "1400px",
    width: "100%",
    margin: "0 auto",
  },

  title: {
    color: "red",
    marginBottom: "18px",
    fontSize: "34px",
    fontWeight: 700,
    letterSpacing: "-1px",
    textShadow: "0 10px 30px rgba(255,255,255,.08)",
  },

  card: {
    position: "relative",

    background: "rgba(2,6,23,0.88)",

    backdropFilter: "blur(14px)",

    border: "1px solid rgba(255,255,255,0.06)",

    borderRadius: "28px",

    padding: "26px",

    marginBottom: "28px",

    overflow: "visible",

    boxShadow: `
      0 30px 80px rgba(0,0,0,.72),
      0 0 40px rgba(59,130,246,.08),
      inset 0 1px 0 rgba(255,255,255,.03)
    `,

    transition: "all .28s cubic-bezier(.4,0,.2,1)",
  },

  fadeInUp: {
    animation: "fadeInUp .55s cubic-bezier(.16,1,.3,1)",
    animationFillMode: "both",
    willChange: "transform, opacity, filter",
  },

  successMessage: {
    position: "fixed",
    top: "20px",
    right: "20px",

    background: "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "white",

    padding: "14px 20px",

    borderRadius: "14px",

    zIndex: 9999,

    boxShadow: "0 10px 30px rgba(34,197,94,.35)",
  },

  errorMessage: {
    background: "linear-gradient(135deg,#ef4444,#dc2626)",

    color: "white",

    padding: "14px 20px",

    borderRadius: "14px",

    marginBottom: "20px",

    textAlign: "center",

    boxShadow: "0 10px 30px rgba(239,68,68,.35)",
  },

  confirmButton: {
    marginBottom: "20px",

    background: "linear-gradient(135deg,#22c55e,#16a34a)",

    padding: "12px 22px",

    borderRadius: "14px",

    color: "white",

    border: "none",

    fontWeight: 700,

    cursor: "pointer",

    transition: "all .25s ease",

    boxShadow: "0 0 25px rgba(34,197,94,.28)",
  },

  confirmButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  detailData: {
    background: "linear-gradient(145deg,#020617,#071126)",

    padding: "14px 16px",

    borderRadius: "16px",

    marginBottom: "12px",

    color: "white",

    border: "1px solid rgba(255,255,255,.04)",

    boxShadow: `
    0 8px 24px rgba(0,0,0,.30),
    inset 0 1px 0 rgba(255,255,255,.02)
  `,

    transition: "all .2s ease",
  },

  amountInput: {
    width: "100%",

    marginTop: "10px",

    padding: "10px 12px",

    borderRadius: "10px",

    color: "white",

    fontSize: "14px",

    fontWeight: 700,

    outline: "none",

    transition: "all .2s ease",

    background: "rgba(15,23,42,.82)",

    height: "42px",
  },

  amountInputEditing: {
    border: "1px solid #38bdf8",

    boxShadow: `
      0 0 0 4px rgba(56,189,248,.10),
      0 0 20px rgba(56,189,248,.25)
    `,
  },

  amountInputDisabled: {
    border: "1px solid rgba(255,255,255,.06)",
    opacity: 0.75,
  },

  saveButton: {
    padding: "8px 14px",

    borderRadius: "10px",

    fontSize: "12px",

    color: "white",

    border: "none",

    cursor: "pointer",

    fontWeight: 700,

    transition: "all .25s ease",
  },

  saveButtonEditing: {
    background: "linear-gradient(135deg,#22c55e,#16a34a)",

    transform: "translateY(-2px)",

    boxShadow: "0 0 25px rgba(34,197,94,.35)",
  },

  saveButtonDefault: {
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",

    boxShadow: "0 0 25px rgba(59,130,246,.22)",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",

    cursor: "pointer",

    userSelect: "none",

    color: "white",

    fontWeight: 600,
  },

  checkbox: {
    width: "18px",
    height: "18px",

    cursor: "pointer",

    accentColor: "#22c55e",
  },

  checkboxChecked: {
    transform: "scale(1.08)",
    filter: "drop-shadow(0 0 6px rgba(34,197,94,.6))",
  },

  checkboxUnchecked: {
    opacity: 0.7,
  },
};
