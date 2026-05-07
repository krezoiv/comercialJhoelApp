import type { CSSProperties } from "react";

export const bankAgentPageStyles: Record<string, CSSProperties> = {
  errorMessage: {
    background: "#ff4d4f",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    textAlign: "center",
  },

  successMessage: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "#1677ff",
    color: "white",
    padding: "14px 20px",
    borderRadius: "10px",
    zIndex: 9999,
  },

  isDropdownOpen: {
    color: "white",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600",
  },
  confirmButton: {
    marginBottom: "20px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    padding: "12px 20px",
    borderRadius: "10px",
    color: "white",
    border: "none",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.25s ease",
  },

  confirmButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  detailData: {
    background: "#020617",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "15px",
    color: "white",
    border: "1px solid #1e293b",
  },

  amountInput: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    color: "white",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.25s ease",
  },

  amountInputEditing: {
    background: "#0f172a",
    border: "1px solid #38bdf8",
    opacity: 1,
    boxShadow: "0 0 12px rgba(56,189,248,0.4)",
  },

  amountInputDisabled: {
    background: "#1e293b",
    border: "1px solid #334155",
    opacity: 0.7,
    boxShadow: "none",
  },

  saveButton: {
    padding: "10px 16px",
    borderRadius: "10px",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.25s ease",
  },

  saveButtonEditing: {
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    transform: "scale(1.03)",
    boxShadow: "0 0 18px rgba(34,197,94,.45)",
  },

  saveButtonDefault: {
    background: "linear-gradient(135deg,#3b82f6,#2563eb)",
    transform: "scale(1)",
    boxShadow: "0 0 18px rgba(59,130,246,.25)",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    userSelect: "none",
    fontSize: "14px",
    opacity: 0.92,
    color: "white",
  },

  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#22c55e",
    transition: "all 0.2s ease",
  },

  checkboxChecked: {
    transform: "scale(1.08)",
    filter: "drop-shadow(0 0 6px rgba(34,197,94,.6))",
  },

  checkboxUnchecked: {
    opacity: 0.7,
  },
};
