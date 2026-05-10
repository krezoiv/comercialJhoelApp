import type { CSSProperties } from "react";

export const bankAgentPageStyles: Record<string, CSSProperties> = {
  inner: {
    padding: "20px",
    maxWidth: "1400px",
    width: "100%",
    margin: "0 auto",
  },

  title: {
    color: "white",
    marginBottom: "24px",
    fontSize: "42px",
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
  },

  fadeInUp: {
    animation: "fadeInUp .55s cubic-bezier(.16,1,.3,1)",
    animationFillMode: "both",
  },
};
