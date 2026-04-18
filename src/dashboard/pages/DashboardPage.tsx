import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { dashboardStyles } from "../styles/dashboard.styles";

export const DashboardPage = () => {
  return (
    <div style={dashboardStyles.layout}>
      <Sidebar />

      <div style={dashboardStyles.main}>
        <Navbar />

        <div style={dashboardStyles.content}>
          <h1>Dashboard 🚀</h1>
          <p>Bienvenido al sistema</p>
        </div>
      </div>
    </div>
  );
};

