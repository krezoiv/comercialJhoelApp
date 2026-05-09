import { useState } from "react";

import { useExpenseDetail } from "../hooks/useExpenseDetail";

import { ExpenseDetailCard } from "./ExpenseDetailCard";

import { expenseService } from "../services/expense.service";

interface Props {
  customerId: string;
  onRefresh: () => void;
}
interface ExpenseChange {
  id: string;
  amount: number;
  createdAt: string;
  checked: boolean;
}
export const ExpenseDrillDown = ({ customerId, onRefresh }: Props) => {
  const { data, loading, refetch } = useExpenseDetail(customerId, true);

  const [changes, setChanges] = useState<ExpenseChange[]>([]);

  const handleChange = (change: ExpenseChange) => {
    setChanges((prev) => {
      const exists = prev.find((x) => x.id === change.id);

      if (exists) {
        return prev.map((x) => (x.id === change.id ? change : x));
      }

      return [...prev, change];
    });
  };

  const handleSaveAll = async () => {
    try {
      if (!changes.length) {
        alert("No hay cambios");
        return;
      }

      await expenseService.processExpenses({
        data: changes,
      });

      alert("Cambios guardados");

      setChanges([]);

      refetch();

      onRefresh();
    } catch (error) {
      console.error(error);

      alert("Error guardando cambios");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >
        Cargando movimientos...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        minWidth: "420px",
        maxWidth: "520px",

        background: `
          linear-gradient(
            180deg,
            rgba(15,23,42,.96),
            rgba(2,6,23,.98)
          )
        `,

        border: "1px solid rgba(255,255,255,.05)",

        borderRadius: "28px",

        padding: "24px",

        boxShadow: `
          0 30px 60px rgba(0,0,0,.45),
          inset 0 1px 0 rgba(255,255,255,.03)
        `,

        backdropFilter: "blur(18px)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          marginBottom: "22px",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: 800,
            margin: 0,
          }}
        >
          Movimientos
        </h2>

        <div
          style={{
            background: "rgba(34,197,94,.12)",

            color: "#22c55e",

            padding: "8px 14px",

            borderRadius: "999px",

            fontSize: "13px",

            fontWeight: 700,

            border: "1px solid rgba(34,197,94,.18)",
          }}
        >
          {data.length} registros
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",

          maxHeight: "720px",

          overflowY: "auto",

          paddingRight: "4px",
        }}
      >
        {data.map((item) => (
          <ExpenseDetailCard
            key={item.id}
            item={item}
            onSaved={refetch}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "20px",

          display: "flex",

          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={handleSaveAll}
          disabled={!changes.length}
          style={{
            padding: "14px 22px",

            borderRadius: "14px",

            border: "none",

            background: !changes.length
              ? "#334155"
              : "linear-gradient(135deg,#00c853,#00e676)",

            color: "white",

            fontWeight: 700,

            cursor: !changes.length ? "not-allowed" : "pointer",

            boxShadow: !changes.length
              ? "none"
              : "0 10px 30px rgba(0,200,83,.35)",

            transition: "all .25s ease",
          }}
        >
          💾 Guardar cambios
        </button>
      </div>
    </div>
  );
};
