import db from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const user = await db.user.findFirst();
  return (
    <>{JSON.stringify(user)}</>
  );
}
