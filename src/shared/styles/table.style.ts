import type { CSSProperties } from "react";
import { theme } from "./theme.style";

export const tableStyles: Record<string, CSSProperties> = {
  table: {
    width: "100%",

    borderCollapse: "separate",

    borderSpacing: 0,

    background: theme.colors.card,

    backdropFilter: "blur(18px)",

    borderRadius: theme.radius.xl,

    overflow: "hidden",

    border: `1px solid ${theme.colors.border}`,

    boxShadow: theme.shadows.card,
  },

  thead: {
    background: "rgba(30,41,59,.92)",

    color: theme.colors.textSecondary,
  },

  th: {
    padding: "18px",

    textAlign: "center",

    fontWeight: 700,
  },

  td: {
    padding: "18px",

    textAlign: "center",

    color: "white",

    borderBottom: `1px solid ${theme.colors.border}`,

    transition: theme.transitions.fast,
  },

  row: {
    transition: theme.transitions.fast,
  },

  rowHover: {
    background: "rgba(15,23,42,.95)",

    transform: "scale(1.002)",
  },
};
