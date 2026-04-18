import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { sideBarStyles } from "../styles/sidebar.styles";
import { sidebarMenu } from "./sidebar-menu";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useUser } from "../../users/hooks/useUser";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rol } = useUser();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div
      style={{
        ...sideBarStyles.sidebar,
        ...(collapsed ? sideBarStyles.sidebarCollapsed : {}),
      }}
    >
      {/* 🔹 BOTÓN COLLAPSE */}
      <button
        style={sideBarStyles.toggle}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>

      {/* 🔹 LOGO */}
      {!collapsed && (
        <h2 style={sideBarStyles.logo}>📚 Librería</h2>
      )}

      {/* 🔹 MENU */}
      {sidebarMenu
        .filter((item) => item.roles.includes(rol))
        .map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isOpen = openMenus[item.label];

          return (
            <div key={index}>
              {/* 🔹 ITEM PRINCIPAL */}
              <button
                style={{
                  ...sideBarStyles.link,
                  ...(isActive ? sideBarStyles.linkActive : {}),
                }}
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.label);
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
              >
                <Icon size={18} style={sideBarStyles.icon} />

                {!collapsed && (
                  <>
                    <span style={sideBarStyles.label}>{item.label}</span>

                    {item.children && (
                      <ChevronDown
                        size={16}
                        style={{
                          marginLeft: "auto",
                          transform: isOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "0.2s",
                        }}
                      />
                    )}
                  </>
                )}
              </button>

              {/* 🔹 SUBMENU */}
              {!collapsed && item.children && isOpen && (
                <div style={sideBarStyles.submenu}>
                  {item.children
                    .filter((sub) => sub.roles.includes(rol))
                    .map((sub, i) => {
                      const SubIcon = sub.icon;
                      const isSubActive =
                        location.pathname === sub.path;

                      return (
                        <button
                          key={i}
                          style={{
                            ...sideBarStyles.link,
                            ...(isSubActive
                              ? sideBarStyles.linkActive
                              : {}),
                            paddingLeft: "35px",
                            fontSize: "14px",
                          }}
                          onClick={() => navigate(sub.path!)}
                        >
                          <SubIcon size={16} style={sideBarStyles.icon} />
                          {sub.label}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};