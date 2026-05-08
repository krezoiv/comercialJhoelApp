import type { CSSProperties } from "react";

export const expenseFormStyles: Record<string, CSSProperties> = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",

    background: "rgba(2,6,23,0.75)",
    backdropFilter: "blur(16px)",

    padding: "22px",

    borderRadius: "22px",

    border: "1px solid rgba(255,255,255,0.05)",

    boxShadow: `
      0 20px 50px rgba(0,0,0,.55),
      inset 0 1px 0 rgba(255,255,255,.03)
    `,
  },

  input: {
    padding: "14px 18px",

    borderRadius: "16px",

    border: "1px solid rgba(255,255,255,.06)",

    background: "#0f172a",

    color: "white",

    outline: "none",

    fontSize: "15px",

    transition: "all .25s ease",

    minWidth: "180px",

    boxShadow: "inset 0 1px 0 rgba(255,255,255,.03)",
  },

  inputFocus: {
    border: "1px solid #22d3ee",

    boxShadow: "0 0 18px rgba(34,211,238,.25)",

    transform: "scale(1.01)",
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  inputIcon: {
    position: "absolute",
    left: "12px",
    fontSize: "14px",
    opacity: 0.6,
  },

  inputWithIcon: {
    paddingLeft: "34px",
  },

  button: {
    background: "linear-gradient(135deg,#22d3ee,#06b6d4)",

    border: "1px solid rgba(255,255,255,.06)",

    padding: "14px 22px",

    borderRadius: "16px",

    color: "white",

    fontWeight: 700,

    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    gap: "8px",

    transition: "all .25s ease",

    boxShadow: "0 0 25px rgba(34,211,238,.28)",
  },

  buttonHover: {
    transform: "translateY(-2px) scale(1.02)",

    boxShadow: "0 16px 34px rgba(34,197,94,.45)",
  },

  dropdown: {
    position: "absolute",

    top: "110%",
    left: 0,
    right: 0,

    background: "rgba(2,6,23,.96)",

    backdropFilter: "blur(16px)",

    border: "1px solid rgba(255,255,255,.06)",

    borderRadius: "16px",

    zIndex: 999999,

    maxHeight: "260px",

    overflowY: "auto",

    boxShadow: "0 25px 50px rgba(0,0,0,.75)",
  },

  dropdownItem: {
    padding: "14px",

    cursor: "pointer",

    color: "#e2e8f0",

    transition: "all .2s ease",

    borderBottom: "1px solid rgba(255,255,255,.03)",
  },

  dropdownItemHover: {
    background: "rgba(34,197,94,.12)",

    color: "white",

    transform: "translateX(3px)",
  },

  select: {
    padding: "14px 16px",

    borderRadius: "14px",

    border: "1px solid rgba(255,255,255,.07)",

    background: "rgba(15,23,42,.72)",

    color: "white",

    minWidth: "190px",

    appearance: "none",

    backgroundImage:
      "linear-gradient(45deg, transparent 50%, #22c55e 50%), linear-gradient(135deg, #22c55e 50%, transparent 50%)",

    backgroundPosition:
      "calc(100% - 18px) calc(50% - 3px), calc(100% - 12px) calc(50% - 3px)",

    backgroundSize: "5px 5px",

    backgroundRepeat: "no-repeat",

    paddingRight: "36px",

    transition: "all .25s ease",
  },
};
