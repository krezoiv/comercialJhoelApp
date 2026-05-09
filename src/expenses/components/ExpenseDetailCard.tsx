import { useState, useEffect, useRef } from "react";
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
}

export const ExpenseDetailCard = ({ item, onSaved, onChange }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);

  const [amount, setAmount] = useState(formatMoney(Number(item.amount)));

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChange?.({
      id: item.id,

      amount: Number(amount.replace(/,/g, "")),

      createdAt: new Date(item.createdAt).toISOString(),

      checked,
    });
  }, [amount, checked, item.id, item.createdAt, onChange]);

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

          margin: 0,

          fontSize: "18px",

          fontWeight: 800,
        }}
      >
        {item.firstName} {item.lastName}
      </h3>

      {/* TYPE */}
      <div
        style={{
          marginTop: "10px",

          color: "#38bdf8",

          fontSize: "15px",
        }}
      >
        🏦 {item.expenseType}
      </div>

      {/* DESCRIPTION */}
      <div
        style={{
          marginTop: "14px",

          color: "white",

          fontSize: "15px",
        }}
      >
        🪪 {item.description}
      </div>

      {/* DATE */}
      <div
        style={{
          marginTop: "14px",

          color: "#64748b",

          fontSize: "14px",
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
            const raw = e.target.value.replace(/,/g, "");

            const validated = validateDecimalInput(
              raw,
              amount.replace(/,/g, ""),
            );

            if (validated !== null) {
              setAmount(validated);
            }
          }}
          onBlur={() => {
            const numeric = Number(amount.replace(/,/g, ""));

            if (!isNaN(numeric)) {
              setAmount(formatMoney(numeric));
            }
          }}
          style={{
            width: "100%",

            padding: "18px",

            borderRadius: "18px",

            border: isEditing
              ? "2px solid #1ea7ff"
              : "1px solid rgba(255,255,255,.06)",

            background: "rgba(255,255,255,.08)",

            color: "white",

            fontSize: "18px",

            fontWeight: 700,

            outline: "none",
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

            padding: "14px 20px",

            borderRadius: "16px",

            cursor: "pointer",

            color: "white",

            fontWeight: 700,

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
          Eliminar
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
          />
        </label>
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "18px",

          color: "#64748b",

          fontSize: "14px",
        }}
      >
        creado por: {item.userName}
      </div>
    </div>
  );
};
