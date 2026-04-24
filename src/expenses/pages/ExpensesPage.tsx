import { useExpenses } from "../hooks/useExpenses";
import { ExpensesTable } from "../components/ExpensesTable";
import { ExpenseForm } from "../components/ExpenseForm";
import { expenseService } from "../services/expense.service";

import { expensesPageStyles } from "../styles/expensesPage.style";

import type { CreateExpenseDto } from "../interfaces/expense-request.interface";

export const ExpensesPage = () => {
  const { data, loading, refetch } = useExpenses();

  const handleCreate = async (payload: CreateExpenseDto) => {
    try {
      await expenseService.createExpense(payload);
      refetch();
    } catch (error) {
      console.error("🔥 Error creando gasto:", error);
    }
  };

  if (loading) {
    return <p style={expensesPageStyles.loading}>Cargando...</p>;
  }

  return (
    <div style={expensesPageStyles.inner}>
      <h1 style={expensesPageStyles.title}>💸 Gastos</h1>

      <div style={expensesPageStyles.card}>
        <ExpenseForm onSubmit={handleCreate} />
      </div>

      <div style={expensesPageStyles.card}>
        <ExpensesTable data={data} />
      </div>
    </div>
  );
};
