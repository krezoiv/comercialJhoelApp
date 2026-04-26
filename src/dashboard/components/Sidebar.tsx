import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { sideBarStyles } from "../styles/sidebar.styles";
import { sidebarMenu, type SidebarItem } from "./sidebar-menu";
import { ChevronDown } from "lucide-react";
import { useUser } from "../../users/hooks/useUser";

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const Sidebar = ({ collapsed, setCollapsed }: Props) => {
  const { firstName, lastName } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [jumpAnim, setJumpAnim] = useState<"left" | "right" | "none">("none");

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  const getInitials = (name: string) => {
    if (!name) return "";

    const parts = name.split(" ");
    return parts
      .slice(0, 2)
      .map((n) => n[0])
      .join(" ")
      .toUpperCase();
  };

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 10,
          padding: "10px",
        }}
      >
        {/* 🔵 AVATAR */}
        <div
          style={{
            fontWeight: "600",
            color: "white",
            fontSize: collapsed ? "16px" : "18px",
            letterSpacing: "1px",
          }}
        >
          {/* 👇 SOLO mostrar iniciales cuando está colapsado */}
          <div style={sideBarStyles.avatarContainer}>
            <div>
              {collapsed && (
                <div style={sideBarStyles.avatarContainer}>
                  {/* 🔥 Iniciales */}
                  <div style={sideBarStyles.initials}>
                    {getInitials(fullName)}
                  </div>

                  {/* ✨ Nombre pequeño */}
                  <div style={sideBarStyles.fullName}>{fullName}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 👇 SOLO mostrar nombre cuando NO está colapsado */}
        {!collapsed && (
          <div style={{ fontWeight: "bold", color: "white" }}>{fullName}</div>
        )}
      </div>

      {/* TOGGLE */}
      <button
        onClick={() => {
          const next = !collapsed;

          setCollapsed(next);
          setJumpAnim(next ? "left" : "right");

          setTimeout(() => setJumpAnim("none"), 400);
        }}
        style={{
          ...sideBarStyles.toggleButton,

          // 🔥 SOLO dinámico
          animation:
            jumpAnim === "left"
              ? "jumpLeft 0.45s ease"
              : jumpAnim === "right"
                ? "jumpRight 0.45s ease"
                : "none",
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
              ...sideBarStyles.toggleInner,

              // 🔥 SOLO dinámico
              transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
            }}
          ></span>
          <span style={sideBarStyles.arrowBlue}>❯</span>

          <span
            style={{
              ...sideBarStyles.arrowGreen,
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
