import type { ExpenseCustomer } from "../interfaces/expense-customer.interface";
import { expensesTableStyles } from "../styles/expensesTable.style";

interface Props {
  data: ExpenseCustomer[];
}

export const ExpensesTable = ({ data }: Props) => {
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
            onMouseEnter={(e) => (e.currentTarget.style.background = "#020617")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <td style={expensesTableStyles.td}>
              {c.firstName} {c.lastName}
            </td>

            <td style={expensesTableStyles.td}>{c.totalExpenses}</td>

            <td style={expensesTableStyles.td}>
              Q {Number(c.totalAmount).toFixed(2)}
            </td>

            <td style={expensesTableStyles.td}>
              <div style={expensesTableStyles.actions}>
                <span
                  style={expensesTableStyles.actionBtn}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  👁
                </span>

                <span
                  style={expensesTableStyles.actionBtn}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  ✏️
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
