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
          <>
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
                {c.firstName} {c.lastName}
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
                  <button
                    style={expensesTableStyles.viewButton}
                    onClick={() =>
                      setExpandedId(
                        expandedId === c.customerId ? null : c.customerId,
                      )
                    }
                  >
                    👁 Ver
                  </button>

                  <button style={expensesTableStyles.editButton}>
                    ✏️ Editar
                  </button>
                </div>
              </td>
            </tr>

            {expandedId === c.customerId && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: "30px 0",
                    background: "transparent",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ExpenseDrillDown
                      customerId={c.customerId}
                      onRefresh={onRefresh}
                    />
                  </div>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};
