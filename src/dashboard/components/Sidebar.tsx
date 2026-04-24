import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

import { sideBarStyles } from "../styles/sidebar.styles";
import { sidebarMenu } from "./sidebar-menu";
import type { SidebarItem } from "./sidebar-menu";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // 🔥 Persistencia submenu
  const [openMenu, setOpenMenu] = useState<string | null>(() => {
    return localStorage.getItem("openMenu");
  });

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path);

  // 🔥 Mantener submenu abierto según ruta
  useEffect(() => {
    const currentMenu = sidebarMenu.find((item) =>
      item.children?.some((sub) => location.pathname.startsWith(sub.path)),
    );

    const newLabel = currentMenu?.label ?? null;

    // ✅ SOLO setea, sin comparar con openMenu
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenMenu(newLabel);

    if (newLabel) {
      localStorage.setItem("openMenu", newLabel);
    } else {
      localStorage.removeItem("openMenu");
    }
  }, [location.pathname]);

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
      {/* HEADER */}
      <div style={sideBarStyles.logoContainer}>
        <span style={sideBarStyles.logo}>📚</span>
        {!collapsed && <span style={sideBarStyles.logoText}>Librería</span>}
      </div>

      {/* TOGGLE */}
      <button onClick={toggleSidebar} style={sideBarStyles.toggle}>
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>

      {/* MENU */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {sidebarMenu.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isOpen = openMenu === item.label;

          return (
            <div key={item.label}>
              {/* 🔹 ITEM PRINCIPAL */}
              <button
                onClick={() => handleMenuClick(item)}
                style={{
                  ...sideBarStyles.link,
                  ...(active ? sideBarStyles.linkActive : {}),
                }}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, sideBarStyles.linkHover)
                }
                onMouseLeave={(e) =>
                  Object.assign(
                    e.currentTarget.style,
                    active ? sideBarStyles.linkActive : sideBarStyles.link,
                  )
                }
              >
                <Icon size={18} />

                {!collapsed && (
                  <>
                    <span>{item.label}</span>

                    {/* 🔥 FLECHA */}
                    {item.children && (
                      <ChevronDown
                        size={16}
                        style={{
                          marginLeft: "auto",
                          transition: "0.3s",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    )}
                  </>
                )}
              </button>

              {/* 🔹 SUBMENU */}
              {item.children && (
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
                        onMouseEnter={(e) =>
                          Object.assign(
                            e.currentTarget.style,
                            sideBarStyles.sublinkHover,
                          )
                        }
                        onMouseLeave={(e) =>
                          Object.assign(
                            e.currentTarget.style,
                            subActive
                              ? sideBarStyles.sublinkActive
                              : sideBarStyles.sublink,
                          )
                        }
                      >
                        <SubIcon size={16} />
                        {!collapsed && <span>{sub.label}</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      {!collapsed && (
        <div style={sideBarStyles.footer}>v1.0 Sistema financiero</div>
      )}
    </div>
  );
};
