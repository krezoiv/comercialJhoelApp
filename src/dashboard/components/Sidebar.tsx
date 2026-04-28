import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../users/hooks/useUser";
import { sideBarStyles } from "../styles/sidebar.styles";
import { sidebarMenu, type SidebarItem } from "./sidebar-menu";
import { ChevronDown } from "lucide-react";

type Props = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export const Sidebar = ({ collapsed, setCollapsed }: Props) => {
  const { firstName, lastName } = useUser();
  const initializedRef = useRef(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
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
  const location = useLocation();
  const navigate = useNavigate();

  /* 🔥 DETECTAR MENÚ ACTIVO POR RUTA */
  const currentMenu = sidebarMenu.find((item) =>
    item.children?.some((sub) => location.pathname.startsWith(sub.path)),
  );

  /* 🔥 SINCRONIZAR SOLO UNA VEZ */
  useEffect(() => {
    if (!initializedRef.current && currentMenu) {
      setTimeout(() => {
        setOpenMenu(currentMenu.label);
        initializedRef.current = true;
      }, 0);
    }
  }, [currentMenu]);

  // 🔥 detectar activo
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  /* 🔥 TOGGLE */

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

      {/* 🔥 MENÚ */}
      {sidebarMenu.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);

        const isOpen = openMenu === item.label;

        return (
          <div key={item.label}>
            {/* 🔥 ITEM PRINCIPAL */}
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
            {item.children && (
              <div
                style={{
                  ...sideBarStyles.submenuContainer,
                  maxHeight: isOpen ? "500px" : "0px",
                  opacity: isOpen ? 1 : 0,
                  transition: "max-height 0.35s ease, opacity 0.2s",
                }}
              >
                {item.children.map((sub) => {
                  const isSubActive = location.pathname === sub.path;

                  return (
                    <button
                      key={sub.label + sub.path}
                      style={{
                        ...sideBarStyles.sublink,
                        ...(isSubActive ? sideBarStyles.sublinkActive : {}),
                      }}
                      onClick={() => navigate(sub.path)}
                    >
                      <sub.icon size={16} />
                      {!collapsed && <span>{sub.label}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* 🔥 FOOTER */}
      <div style={sideBarStyles.footer}>
        <span>KZi Technologies</span>
        <span>v1.0.0</span>
      </div>
    </div>
  );
};
