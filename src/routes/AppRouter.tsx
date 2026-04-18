import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { AuthGuard } from "../auth/guards/AuthGuard";
import { DashboardPage } from "../dashboard/pages/DashboardPage";
import { BanksPage } from "../banks/pages/BanksPage";
import { routes } from "./routes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />

        <Route
          path={routes.dashboard}
          element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          }
        />

        <Route
          path={routes.banks}
          element={
            <AuthGuard>
              <BanksPage />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};