import { Sidebar } from "./dashboard/components/Sidebar";
import { Navbar } from "./dashboard/components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // 🔥 CLAVE

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* CONTENIDO */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",

          marginLeft: collapsed ? "100px" : "260px", // 🔥 dinámico
          transition: "all 0.3s ease",
        }}
      >
        <Navbar />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
