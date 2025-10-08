import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "$/generated/prisma";

type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  if (session.user?.role !== Role.ADMIN) redirect("/client");
  return <>{children}</>;
};

export default Layout;
