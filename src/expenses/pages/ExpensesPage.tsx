import { Navbar } from "../../dashboard/components/Navbar";
import { Sidebar } from "../../dashboard/components/Sidebar";

import { useExpenses } from "../hooks/useExpenses";
import { ExpensesTable } from "../components/ExpensesTable";
import { ExpenseForm } from "../components/ExpenseForm";
import { expenseService } from "../services/expense.service";

import type { Expense } from "../interfaces/expense.interface";
import { expensesPageStyles } from "../styles/expensesPage.style";

export type CreateExpenseDto = Omit<Expense, "id">;

export const ExpensesPage = () => {
  const { expenses, loading, refetch } = useExpenses();

  const handleCreate = async (data: CreateExpenseDto) => {
    await expenseService.createExpense(data);
    refetch();
  };

  if (loading) {
    return <p style={expensesPageStyles.loading}>Cargando...</p>;
  }

  return (
    <div style={expensesPageStyles.container}>
      <Sidebar />

      <div style={expensesPageStyles.content}>
        <Navbar />

        <div style={expensesPageStyles.inner}>
          <h1 style={expensesPageStyles.title}>💸 Gastos</h1>

          <ExpenseForm onSubmit={handleCreate} />

          <div style={expensesPageStyles.tableWrapper}>
            <ExpensesTable expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};
