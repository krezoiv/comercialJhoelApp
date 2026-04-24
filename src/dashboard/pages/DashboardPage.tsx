import { dashboardStyles } from "../styles/dashboard.styles";

export const DashboardPage = () => {
  return (
    <div>
      <div style={dashboardStyles.main}>
        <div style={dashboardStyles.content}>
          <h1>Dashboard 🚀</h1>
          <p>Bienvenido al sistema</p>
        </div>
      </div>
    </div>
  );
};
