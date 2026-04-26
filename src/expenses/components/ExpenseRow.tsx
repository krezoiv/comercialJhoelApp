import { formatMoney } from "../../shared/utils/money.util";
import type { Expense } from "../interfaces/expense.interface";
//import type { Expense } from "../interfaces/expense.interface";
import { expenseRowStyles } from "../styles/expenseRow.style";

interface Props {
  expense: Expense;
}

export const ExpenseRow = ({ expense }: Props) => {
  return (
    <tr style={expenseRowStyles.row}>
      <td>{expense.name}</td>
      <td>{expense.client}</td>

      <td style={expenseRowStyles.amount(expense.type)}>
        {expense.type === "credit" ? "+" : "-"} Q{" "}
        {formatMoney(expense.amount || 0)}
      </td>

      <td>{expense.type === "credit" ? "Crédito" : "Débito"}</td>
      <td>{expense.entryDate}</td>
      <td>{expense.applyDate}</td>
    </tr>
  );
};
