import type { BankAgent } from "../interfaces/bank-agent.interface";
import { expensesTableStyles } from "../../expenses/styles/expensesTable.style";

interface Props {
  data: BankAgent[];
}

export const BankAgentsTable = ({ data }: Props) => {
  return (
    <table style={expensesTableStyles.table}>
      <thead style={expensesTableStyles.thead}>
        <tr>
          <th style={expensesTableStyles.th}>Cliente</th>
          <th style={expensesTableStyles.th}>Total transacciones</th>
          <th style={expensesTableStyles.th}>Total monto</th>
          <th style={expensesTableStyles.th}>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => (
          <tr
            key={c.customerId}
            style={expensesTableStyles.row}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#020617")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <td style={expensesTableStyles.td}>
              {c.firstName} {c.lastName}
            </td>

            <td style={expensesTableStyles.td}>{c.totalTransactions}</td>

            <td style={expensesTableStyles.td}>
              Q {Number(c.totalAmount).toFixed(2)}
            </td>

            <td style={expensesTableStyles.td}>
              <div style={expensesTableStyles.actions}>
                <span style={expensesTableStyles.actionBtn}>👁</span>
                <span style={expensesTableStyles.actionBtn}>✏️</span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
