import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "../auth/pages/LoginPage";
import { AuthGuard } from "../auth/guards/AuthGuard";

import { DashboardPage } from "../dashboard/pages/DashboardPage";
import { BanksPage } from "../banks/pages/BanksPage";
import { ExpensesPage } from "../expenses/pages/ExpensesPage";

import { MainLayout } from "../MainLayout";
import { routes } from "./routes";
import { BankAgentsPage } from "../banks-agents/pages/BankAgentPage";
import { CustomersPage } from "../customers/pages/CustomersPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 PUBLIC */}
        <Route path={routes.login} element={<LoginPage />} />

        {/* 🔐 PROTEGIDO + LAYOUT */}
        <Route
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }
        >
          {/* 🔥 AQUÍ VA LO IMPORTANTE */}
          <Route path={routes.dashboard} element={<DashboardPage />} />
          <Route path={routes.banks} element={<BanksPage />} />
          <Route path={routes.gastos} element={<ExpensesPage />} />
          <Route path={routes.agentes} element={<BankAgentsPage />} />
          <Route path={routes.clientes} element={<CustomersPage />} />
          BankAgentsPage
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
