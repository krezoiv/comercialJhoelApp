import React from "react";

interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<Props> = ({
  isOpen,
  title = "Confirmar",
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>

        <div style={styles.actions}>
          <button onClick={onCancel} style={styles.cancel}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={styles.confirm}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    color: "white",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  cancel: {
    background: "#64748b",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
  },
  confirm: {
    background: "#22c55e",
    color: "white",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
  },
};
