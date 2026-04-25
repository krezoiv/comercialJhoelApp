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

          marginLeft: collapsed ? "100px" : "260px",

          paddingTop: "100px", // 🔥 CLAVE (altura navbar + margen)
          paddingLeft: "20px",
          paddingRight: "20px",

          transition: "all 0.3s ease",
        }}
      >
        <Navbar collapsed={collapsed} />

        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
