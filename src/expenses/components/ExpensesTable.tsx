import type { ExpenseCustomer } from "../interfaces/expense-customer.interface";
import { expensesTableStyles } from "../styles/expensesTable.style";
import { useState } from "react";
import { ExpenseDrillDown } from "./ExpenseDrillDown";

interface Props {
  data: ExpenseCustomer[];
  onRefresh: () => void;
}

export const ExpensesTable = ({ data, onRefresh }: Props) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  return (
    <table style={expensesTableStyles.table}>
      <thead style={expensesTableStyles.thead}>
        <tr>
          <th style={expensesTableStyles.th}>Cliente</th>
          <th style={expensesTableStyles.th}>Total gastos</th>
          <th style={expensesTableStyles.th}>Total monto</th>
          <th style={expensesTableStyles.th}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => (
          <tr
            key={c.customerId}
            style={expensesTableStyles.row}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(15,23,42,.92)";

              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";

              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            {/* CLIENTE */}
            <td style={expensesTableStyles.td}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                {/* AVATAR */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",

                    background: "linear-gradient(135deg,#6366f1,#3b82f6)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    color: "white",
                    fontWeight: 700,
                    fontSize: "18px",

                    boxShadow: "0 0 18px rgba(99,102,241,.35)",
                  }}
                >
                  {c.firstName.charAt(0)}
                </div>

                {/* INFO */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  >
                    {c.firstName} {c.lastName}
                  </span>

                  <span
                    style={{
                      opacity: 0.6,
                      fontSize: "13px",
                    }}
                  >
                    ID: {c.customerId.slice(0, 8)}
                  </span>
                </div>
              </div>
            </td>

            {/* TOTAL */}
            <td style={expensesTableStyles.td}>{c.totalExpenses}</td>

            {/* MONTO */}
            <td
              style={{
                ...expensesTableStyles.td,
                color: "#22c55e",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              Q {Number(c.totalAmount).toFixed(2)}
            </td>

            {/* ACTIONS */}
            <td style={expensesTableStyles.td}>
              <div style={expensesTableStyles.actions}>
                {/* VER */}
                <button
                  style={{
                    ...expensesTableStyles.viewButton,
                  }}
                  onClick={() =>
                    setExpandedId(
                      expandedId === c.customerId ? null : c.customerId,
                    )
                  }
                >
                  👁 Ver
                </button>

                {/* EDITAR */}
                <button
                  style={{
                    ...expensesTableStyles.editButton,
                  }}
                >
                  ✏️ Editar
                </button>
              </div>
            </td>
            {expandedId === c.customerId && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: "0px",
                    background: "transparent",
                  }}
                >
                  <ExpenseDrillDown
                    customerId={c.customerId}
                    onRefresh={onRefresh}
                  />
                </td>
              </tr>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
