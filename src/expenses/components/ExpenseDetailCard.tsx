import { useEffect, useState } from "react";
import { formatMoney } from "../../shared/utils/money.util";
import { validateDecimalInput } from "../../shared/utils/numberInput.util";
import { expenseService } from "../services/expense.service";
import type { ExpenseDetail } from "../interfaces/expense-detail.interface";

interface ExpenseChange {
  id: string;
  amount: number;
  createdAt: string;
  checked: boolean;
}

interface Props {
  item: ExpenseDetail;
  onSaved?: () => void;
  onChange?: (change: ExpenseChange) => void;
  globalChecked?: boolean;
}

export const ExpenseDetailCard = ({
  item,
  onSaved,
  onChange,
  globalChecked,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState(formatMoney(Number(item.amount)));

  useEffect(() => {
    if (globalChecked !== undefined) {
      setChecked(globalChecked);
    }
  }, [globalChecked]);

  const handleSave = async () => {
    try {
      setLoading(true);

      await expenseService.processExpenses({
        data: [
          {
            id: item.id,
            amount: Number(amount.replace(/,/g, "")),
            createdAt: new Date(item.createdAt).toISOString(),
            checked,
          },
        ],
      });

      setIsEditing(false);

      onSaved?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "rgba(2,6,23,.92)",
        border: checked
          ? "1px solid rgba(239,68,68,.45)"
          : "1px solid rgba(255,255,255,.04)",
        borderRadius: "24px",
        padding: "22px",
        position: "relative",
        transition: "all .25s ease",
        opacity: checked ? 0.65 : 1,
      }}
    >
      {/* CHECK */}
      <div
        onDoubleClick={() => setChecked(!checked)}
        style={{
          position: "absolute",
          top: "20px",

          right: "20px",

          width: "18px",

          height: "18px",

          borderRadius: "50%",

          background: checked ? "#ef4444" : "rgba(255,255,255,.25)",

          cursor: "pointer",

          transition: "all .2s ease",
        }}
      />

      {/* NAME */}
      <h3
        style={{
          color: "white",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        {item.firstName} {item.lastName}
      </h3>

      {/* TYPE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "18px",
          fontWeight: 700,
          color: "#38bdf8",
        }}
      >
        <span>🏦</span>
        <span>{item.expenseType}</span>
      </div>

      {/* DESCRIPTION */}
      <div
        style={{
          color: "rgba(255,255,255,.82)",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        💳 {item.description}
      </div>

      {/* DATE */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          width: "fit-content",
          padding: "6px 10px",
          borderRadius: "999px",
          background: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.05)",
          color: "#94a3b8",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        📅 {new Date(item.createdAt).toLocaleString()}
      </div>

      {/* INPUT */}
      <div style={{ marginTop: "18px" }}>
        <input
          value={amount}
          disabled={!isEditing}
          onChange={(e) => {
            const value = validateDecimalInput(e.target.value);

            if (value === null) return;

            setAmount(value);

            onChange?.({
              id: item.id,

              amount: Number(value.replace(/,/g, "")),

              createdAt: new Date(item.createdAt).toISOString(),

              checked,
            });
          }}
          onBlur={() => {
            const numeric = Number(amount.replace(/,/g, ""));

            if (!isNaN(numeric)) {
              setAmount(formatMoney(numeric));
            }
          }}
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,.04)",
            background: "rgba(15,23,42,.88)",
            color: "white",
            fontSize: "22px",
            fontWeight: 800,
            padding: "0 16px",
            outline: "none",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,.25)",
          }}
        />
      </div>

      {/* ACTIONS */}
      <div
        style={{
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          marginTop: "18px",
        }}
      >
        <button
          disabled={loading}
          onClick={() => {
            if (isEditing || checked) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          style={{
            border: "none",
            color: "white",
            padding: "10px 16px",
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",

            background:
              isEditing || checked
                ? "linear-gradient(135deg,#00c853,#00e676)"
                : "linear-gradient(135deg,#2563eb,#1d4ed8)",
          }}
        >
          {loading
            ? "Guardando..."
            : isEditing || checked
              ? "💾 Guardar"
              : "✏️ Editar"}
        </button>

        <label
          style={{
            display: "flex",

            alignItems: "center",

            gap: "12px",

            color: "white",

            fontSize: "15px",
          }}
        >
          <div
            onDoubleClick={() => {
              const value = !checked;
              setChecked(value);
              onChange?.({
                id: item.id,
                amount: Number(amount.replace(/,/g, "")),
                createdAt: new Date(item.createdAt).toISOString(),
                checked: value,
              });
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "15px",
                alignItems: "center",
                gap: "8px",
                color: "#ef4444",
                fontWeight: 700,
              }}
            >
              <span style={{ fontSize: "14px" }}>🗑</span>
              <span>Eliminar</span>
            </div>

            <input
              type="checkbox"
              checked={checked}
              readOnly
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
              }}
            />
          </div>
        </label>
      </div>

      {/* FOOTER */}
      <div
        style={{
          color: "#64748b",
          fontSize: "10px",
          marginTop: "16px",
        }}
      >
        creado por: {item.userName}
      </div>
    </div>
  );
};
