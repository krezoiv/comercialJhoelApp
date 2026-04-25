export type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  onClick?: () => void;
  hasSubmenu?: boolean;
  open?: boolean;
};
