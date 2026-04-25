import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

import { sideBarStyles } from "../styles/sidebar.styles";
import { sidebarMenu, type SidebarItem } from "./sidebar-menu";
import { ChevronDown } from "lucide-react";

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const Sidebar = ({ collapsed, setCollapsed }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 estado SOLO para interacción manual
  const [openMenu, setOpenMenu] = useState<string | null>(() =>
    localStorage.getItem("openMenu"),
  );

  // 🔥 detectar activo
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  // 🔥 detectar automáticamente el menú según ruta (SIN useEffect)
  const currentMenu = sidebarMenu.find((item) =>
    item.children?.some((sub) => location.pathname.startsWith(sub.path)),
  );

  const openMenuComputed = currentMenu?.label ?? openMenu;

  // 🔥 toggle sidebar
  //const toggleSidebar = () => setCollapsed(!collapsed);

  // 🔥 click menú principal
  const handleMenuClick = (item: SidebarItem) => {
    if (item.children) {
      const newValue = openMenu === item.label ? null : item.label;

      setOpenMenu(newValue);

      if (newValue) {
        localStorage.setItem("openMenu", newValue);
      } else {
        localStorage.removeItem("openMenu");
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <div
      style={{
        ...sideBarStyles.sidebar,
        ...(collapsed ? sideBarStyles.sidebarCollapsed : {}),
      }}
    >
      {/* 🔥 HEADER */}
      <div style={sideBarStyles.logoContainer}>
        <span style={sideBarStyles.logo}>📚</span>
        {!collapsed && <span style={sideBarStyles.logoText}>Librería</span>}
      </div>

      {/* 🔥 TOGGLE */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: "10px",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            transform: collapsed ? "scaleX(-1)" : "scaleX(1)",
          }}
        >
          {/* 🔵 Flecha azul */}
          <span
            style={{
              color: "#38bdf8",
              textShadow: "0 0 8px rgba(56,189,248,0.8)",
              fontSize: "16px",
              animation: "arrowBounce 1s infinite",
            }}
          >
            ❯
          </span>

          {/* 🟢 Flecha verde (con delay 👇) */}
          <span
            style={{
              color: "#22c55e",
              textShadow: "0 0 10px rgba(34,197,94,0.9)",
              fontSize: "16px",
              animation: "arrowBounce 1s infinite",
              animationDelay: "0.2s",
            }}
          >
            ❯
          </span>
        </span>
      </button>
      {/* 🔥 MENU */}
      {sidebarMenu.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        const isOpen = openMenuComputed === item.label;

        return (
          <div key={item.label}>
            {/* 🔥 MENU PRINCIPAL */}
            <button
              onClick={() => handleMenuClick(item)}
              style={{
                ...sideBarStyles.link,
                ...(active ? sideBarStyles.linkActive : {}),
              }}
            >
              <Icon size={18} />

              {!collapsed && <span>{item.label}</span>}

              {!collapsed && item.children && (
                <span style={{ marginLeft: "auto" }}>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.2s",
                    }}
                  />
                </span>
              )}
            </button>

            {/* 🔥 SUBMENU */}
            {!collapsed && item.children && (
              <div
                style={{
                  ...sideBarStyles.submenuContainer,
                  maxHeight: isOpen ? "500px" : "0px",
                }}
              >
                {item.children.map((sub) => {
                  const SubIcon = sub.icon;
                  const subActive = isActive(sub.path);

                  return (
                    <button
                      key={sub.label}
                      onClick={() => navigate(sub.path)}
                      style={{
                        ...sideBarStyles.sublink,
                        ...(subActive ? sideBarStyles.sublinkActive : {}),
                      }}
                    >
                      <SubIcon size={16} />
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* 🔥 FOOTER */}
      {!collapsed && (
        <div style={sideBarStyles.footer}>
          <span style={{ display: "block", fontSize: "11px" }}>
            v1.0 KZI Technologies Systems
          </span>
          <span style={{ display: "block", fontSize: "10px", opacity: 0.7 }}>
            2026
          </span>
        </div>
      )}
    </div>
  );
};
