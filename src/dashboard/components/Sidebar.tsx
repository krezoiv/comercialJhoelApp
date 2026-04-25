import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import { routes } from "../../routes/routes";

type Props = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export const Sidebar = ({ collapsed, setCollapsed }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openFinanzas, setOpenFinanzas] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleFinanzasClick = () => {
    if (collapsed) setCollapsed(false);
    setOpenFinanzas(!openFinanzas);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "85px",
        left: "20px",
        bottom: "20px",
        width: collapsed ? "90px" : "240px",
        transition: "all 0.3s ease",
        borderRadius: "18px",
        background: "rgba(2,6,23,0.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 10px 40px rgba(0,0,0,0.7)",
        padding: "15px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center", // 👈 clave
          gap: "10px",
          color: "white",
          height: "65px", // 👈 MISMA altura del navbar
          paddingLeft: "5px",
        }}
      >
        <span>📚</span>
        {!collapsed && <strong>Librería</strong>}
      </div>

      {/* TOGGLE */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: "8px",
        }}
      >
        <span
          style={{
            display: "flex",
            gap: "2px",
            alignItems: "center",
            transition: "all 0.3s ease",
            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <span
            style={{
              color: "#38bdf8",
              textShadow: "0 0 6px rgba(56,189,248,0.8)",
              fontSize: "14px",
              transition: "all 0.3s",
            }}
          >
            ❯
          </span>

          <span
            style={{
              color: "#22c55e",
              textShadow: "0 0 8px rgba(34,197,94,0.9)",
              fontSize: "14px",
              transition: "all 0.3s",
            }}
          >
            ❯
          </span>
        </span>
      </button>

      {/* MENÚ */}
      <MenuItem
        icon="🏠"
        label="Dashboard"
        collapsed={collapsed}
        active={isActive(routes.dashboard)}
        onClick={() => handleNavigate(routes.dashboard)}
      />

      <MenuItem
        icon="👥"
        label="Usuarios"
        collapsed={collapsed}
        onClick={() => alert("Ruta usuarios pendiente")}
      />

      <MenuItem
        icon="🏦"
        label="Bancos"
        collapsed={collapsed}
        active={isActive(routes.banks)}
        onClick={() => handleNavigate(routes.banks)}
      />

      {/* FINANZAS */}
      <MenuItem
        icon="🧾"
        label="Finanzas"
        collapsed={collapsed}
        active={openFinanzas}
        hasSubmenu
        open={openFinanzas}
        onClick={handleFinanzasClick}
      />

      {/* SUBMENU ANIMADO */}
      <div
        style={{
          maxHeight: openFinanzas ? "300px" : "0px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          marginLeft: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {!collapsed && (
          <>
            <SubItem
              label="Digitar Bancos"
              onClick={() => handleNavigate(routes.banks)}
            />
            <SubItem
              label="Digitar Gastos"
              onClick={() => handleNavigate(routes.gastos)}
            />
            <SubItem
              label="Depósitos Agentes"
              onClick={() => alert("Pendiente")}
            />
            <SubItem
              label="Cuadre General"
              onClick={() => alert("Pendiente")}
            />
          </>
        )}
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "auto",
          fontSize: "11px",
          color: "#64748b",
        }}
      >
        {!collapsed && (
          <>
            <span style={{ fontSize: "10px", opacity: 0.8 }}>
              v1.0 KZI Technologies Systems
            </span>
            <span style={{ fontSize: "9px", opacity: 0.5 }}>© 2026</span>
          </>
        )}
      </div>
    </div>
  );
};

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  onClick?: () => void;
  hasSubmenu?: boolean;
  open?: boolean;
};

const MenuItem = ({
  icon,
  label,
  collapsed,
  active,
  onClick,
  hasSubmenu,
  open,
}: MenuItemProps) => (
  <div
    onClick={onClick}
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px",
      borderRadius: "12px",
      cursor: "pointer",
      color: active ? "white" : "#cbd5f5",

      background: active
        ? "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(34,197,94,0.1))"
        : "transparent",

      border: active
        ? "1px solid rgba(34,197,94,0.4)"
        : "1px solid rgba(255,255,255,0.05)",

      boxShadow: active ? "0 0 15px rgba(34,197,94,0.5)" : "none",

      transition: "all 0.25s ease",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ fontSize: "18px" }}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </div>

    {/* FLECHA */}
    {!collapsed && hasSubmenu && (
      <span
        style={{
          transition: "all 0.3s ease",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          fontSize: "18px",
          opacity: 0.7,
          display: "flex",
          alignItems: "center",
        }}
      >
        ❯
      </span>
    )}

    {/* Glow lateral */}
    {active && (
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "20%",
          bottom: "20%",
          width: "4px",
          borderRadius: "10px",
          background: "#22c55e",
          boxShadow: "0 0 10px #22c55e",
        }}
      />
    )}
  </div>
);

type SubItemProps = {
  label: string;
  onClick?: () => void;
};

const SubItem = ({ label, onClick }: SubItemProps) => (
  <div
    onClick={onClick}
    style={{
      padding: "10px 12px",
      borderRadius: "10px",
      fontSize: "13px",
      cursor: "pointer",
      color: "#cbd5f5",

      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.08)",

      transition: "all 0.25s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background =
        "linear-gradient(135deg, rgba(34,197,94,0.2), transparent)";
      e.currentTarget.style.border = "1px solid rgba(34,197,94,0.4)";
      e.currentTarget.style.color = "white";
      e.currentTarget.style.boxShadow = "0 0 10px rgba(34,197,94,0.4)";
      e.currentTarget.style.transform = "translateX(4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
      e.currentTarget.style.color = "#cbd5f5";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateX(0)";
    }}
  >
    {label}
  </div>
);
