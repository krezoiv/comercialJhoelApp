import type { Expense } from "../interfaces/expense.interface";
import { ExpenseRow } from "./ExpenseRow";
import { expensesTableStyles } from "../styles/expensesTable.style";

interface Props {
  expenses: Expense[];
}

export const ExpensesTable = ({ expenses }: Props) => {
  return (
    <table style={expensesTableStyles.table}>
      <thead style={expensesTableStyles.thead}>
        <tr>
          <th style={expensesTableStyles.th}>Nombre</th>
          <th style={expensesTableStyles.th}>Cliente</th>
          <th style={expensesTableStyles.th}>Monto</th>
          <th style={expensesTableStyles.th}>Tipo</th>
          <th style={expensesTableStyles.th}>Fecha ingreso</th>
          <th style={expensesTableStyles.th}>Fecha crédito/débito</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((e) => (
          <ExpenseRow key={e.id} expense={e} />
        ))}
      </tbody>
    </table>
  );
};
