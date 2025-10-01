"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import {
  Boxes,
  Apple,
  ChevronLeft,
  Menu,
  Ruler,
  Utensils,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

type RouteGroupType = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};

const routeGroups: RouteGroupType[] = [
  {
    group: "Food Management",
    items: [
      {
        href: "/admin/foods-management/foods",
        label: "Foods",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/categories",
        label: "Categories",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        href: "/admin/users-management/serving-units",
        label: "Serving Units",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
  {
    group: "Meal Management",
    items: [
      {
        href: "/client",
        label: "Client",
        icon: <Utensils className="mr-2 size-3" />,
      },
    ],
  },
];

type routeType = RouteGroupType;
const RouteGroup = ({ group, items }: routeType) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button
          className="text-foreground/80 flex w-full justify-between font-normal"
          variant="ghost"
        >
          {group}
          <div
            className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          >
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={`flex flex-col gap-2 ${!open ? "pointer-events-none" : ""}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              key={item.href}
              className="w-full justify-start font-normal"
              variant="link"
              asChild
            >
              <Link
                className={`flex items-center rounded-md px-5 py-1 transition-all ${pathname === item.href ? "bg-foreground/10 hover:bg-foreground/5" : "hover:bg-foreground/10"}`}
                href={item.href}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-background fixed z-10 h-13 w-screen items-center justify-between border px-2">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </Collapsible.Trigger>
      </Collapsible.Root>
      <div className="flex">
        <DropdownMenu>
            
        </DropdownMenu>
      </div>

      <Collapsible.Root
        className="fixed top-0 left-0 z-20 h-dvh"
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Content forceMount>
          <div
            className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto"
                  onClick={() => setOpen(false)}
                >
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>
            <Separator className="my-2" />
            <div className="mt-4">
             {routeGroups.map((group) => (
                <RouteGroup
                  key={group.group}
                  {...group}
                />
              ))}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main
        className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "ml-64" : "ml-0"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
