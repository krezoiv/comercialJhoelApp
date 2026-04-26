import { useExpenses } from "../hooks/useExpenses";
import { ExpensesTable } from "../components/ExpensesTable";
import { ExpenseForm } from "../components/ExpenseForm";
import { expenseService } from "../services/expense.service";

import { expensesPageStyles } from "../styles/expensesPage.style";
import { useUser } from "../../users/hooks/useUser";

export const ExpensesPage = () => {
  const { data, loading, refetch } = useExpenses();
  const { userId } = useUser();
  const handleCreate = async (data: {
    customerId: string;
    expenseDescription: string;
    expenseAmount: number;
    expenseType: string;
  }) => {
    try {
      if (!userId) {
        alert("Usuario no autenticado");
        return;
      }

      await expenseService.createExpense(data);

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
