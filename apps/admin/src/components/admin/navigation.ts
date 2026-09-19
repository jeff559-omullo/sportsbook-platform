import {
  LayoutDashboard,
  Trophy,
  Ticket,
  Users,
  Wallet,
  ReceiptText,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Matches",
    href: "/admin/matches",
    icon: Trophy,
  },
  {
    title: "Bets",
    href: "/admin/bets",
    icon: Ticket,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Wallet",
    href: "/admin/wallet",
    icon: Wallet,
  },
  {
    title: "Transactions",
    href: "/admin/transactions",
    icon: ReceiptText,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];