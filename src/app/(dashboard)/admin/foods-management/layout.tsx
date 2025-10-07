"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Boxes, Ruler } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  const getDefaultTab = () => {
    if (pathname.includes("/admin/foods-management/categories")) {
      return "categories";
    }
    if (pathname.includes("/admin/foods-management/serving-units")) {
      return "serving-units";
    }
    return "foods";
  };

  return (
    <div className="container mx-auto min-h-[calc(100vh-6rem)]">
      <div className="mb-6">
        <Tabs defaultValue={getDefaultTab()}>
          <TabsList>
            <TabsTrigger value="foods" asChild>
              <Link href="/admin/foods-management/foods">
                <Apple />
                Foods
              </Link>
            </TabsTrigger>
            <TabsTrigger value="categories" asChild>
              <Link href="/admin/foods-management/categories">
                <Boxes />
                Categories
              </Link>
            </TabsTrigger>
            <TabsTrigger value="serving-units" asChild>
              <Link href="/admin/foods-management/serving-units">
                <Ruler />
                Serving Units
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
};

export default Layout;
