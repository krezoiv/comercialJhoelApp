import {
  LayoutDashboard,
  Landmark,
  Calculator,
  NotebookPenIcon,
  BadgeDollarSign,
  LucideTicket,
  FileSliders,
  Settings,
} from "lucide-react";

import { routes } from "../../routes/routes";
import type { LucideIcon } from "lucide-react";

/* ✅ TIPADO CORRECTO */
export interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon; // 🔥 importante (NO unknown)
  roles: string[];
  children?: SidebarItem[];
}

/* ✅ TIPADO DIRECTO DEL ARRAY */
export const sidebarMenu: SidebarItem[] = [
  {
    label: "Dashboard",
    path: routes.dashboard,
    icon: LayoutDashboard,
    roles: ["admin", "user"],
  },

  {
    label: "Bancos",
    path: routes.banks,
    icon: Landmark,
    roles: ["admin"],
  },
  {
    label: "Finanzas",
    path: "/cuadre",
    icon: Calculator,
    roles: ["admin"],
    children: [
      {
        label: "Digitar Bancos",
        path: "/cuadre/digitar-bancos",
        icon: BadgeDollarSign,
        roles: ["admin"],
      },
      {
        label: "Gastos",
        path: "/cuadre/gastos",
        icon: NotebookPenIcon,
        roles: ["admin"],
      },
      {
        label: "Agentes",
        path: "/cuadre/agentes",
        icon: LucideTicket,
        roles: ["admin"],
      },
      {
        label: "Cuadre General",
        path: "/cuadre/cuadre-general",
        icon: FileSliders,
        roles: ["admin"],
      },
      {
        label: "Cuadre General",
        path: "/agentes",
        icon: FileSliders,
        roles: ["admin"],
      },
    ],
  },
  {
    label: "Ajustes",
    path: "#",
    icon: Settings,
    roles: ["admin"],
  },
];
