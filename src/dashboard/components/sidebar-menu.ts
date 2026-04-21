import {
  LayoutDashboard,
  Users,
  Landmark,
  Calculator,
  NotebookPenIcon,
  BadgeDollarSign,
  LucideTicket,
  FileSliders,
} from "lucide-react";

import { routes } from "../../routes/routes";

export const sidebarMenu = [
  {
    label: "Dashboard",
    path: routes.dashboard,
    icon: LayoutDashboard,
    roles: ["admin", "user"],
  },
  {
    label: "Usuarios",
    path: "#",
    icon: Users,
    roles: ["admin"],
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
    icon: Calculator, // de lucide-react
    roles: ["admin"],
    children: [
      {
        label: " Digitar Bancos",
        path: "/cuadre/digitar-bancos",
        icon: BadgeDollarSign, // de lucide-react
        roles: ["admin"],
      },
      {
        label: "Digitar Gastos",
        path: "/cuadre/gastos",
        icon: NotebookPenIcon, // de lucide-react
        roles: ["admin"],
      },
      {
        label: "Digitar Depósitos Agentes",
        path: "/cuadre/depositos-agentes",
        icon: LucideTicket, // de lucide-react
        roles: ["admin"],
      },
      {
        label: "Cuadre General",
        path: "/cuadre/cuadre-general",
        icon: FileSliders, // de lucide-react
        roles: ["admin"],
      },
    ],
  },
];
