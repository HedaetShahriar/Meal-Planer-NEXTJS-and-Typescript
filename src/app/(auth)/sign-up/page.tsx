import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "$/generated/prisma";
import SignUpForm from "./_components/SignUpForm";

const Page = async () => {
  const session = await auth();

  // Handle redirections based on role
  if (session?.user?.role === Role.ADMIN) {
    redirect("/admin/foods-management/foods");
  }

  if (session?.user?.role === Role.USER) {
    redirect("/client");
  }

  // Default: show sign-in form
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default Page;
