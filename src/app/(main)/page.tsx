import Categories from "../dashboard/Categories/Categories";
import { ShortAccounts } from "../dashboard/Accounts";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";

export default async function Main() {
  return (
    <>
      <Link href="/dashboard">Dashboard</Link>
    </>
  );
}
