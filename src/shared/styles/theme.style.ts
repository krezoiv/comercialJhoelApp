import type { CSSProperties } from "react";

export const theme = {
  colors: {
    background: "#020617",

    card: "rgba(2,6,23,0.82)",

    cardLight: "rgba(15,23,42,.72)",

    border: "rgba(255,255,255,.06)",

    text: "#ffffff",

    textSecondary: "#94a3b8",

    primary: "#3b82f6",

    success: "#22c55e",

    danger: "#ef4444",

    warning: "#f59e0b",
  },

  radius: {
    sm: "10px",
    md: "14px",
    lg: "18px",
    xl: "24px",
  },

  shadows: {
    card: `
      0 20px 60px rgba(0,0,0,.55),
      inset 0 1px 0 rgba(255,255,255,.03)
    `,

    primaryGlow: "0 0 18px rgba(59,130,246,.35)",

    successGlow: "0 0 18px rgba(34,197,94,.35)",

    dangerGlow: "0 0 18px rgba(239,68,68,.35)",
  },

  transitions: {
    default: "all .25s ease",

    fast: "all .18s ease",
  },

  glass: {
    background: "rgba(2,6,23,.82)",

    backdropFilter: "blur(18px)",

    border: "1px solid rgba(255,255,255,.06)",
  } as CSSProperties,
};
