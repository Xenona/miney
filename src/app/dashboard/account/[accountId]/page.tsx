import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";
import { ShortAccounts } from "@/app/dashboard/Accounts";
import Categories from "@/app/dashboard/Categories/Categories";

export default async function Account({
  params,
}: {
  params: { accountId: string };
}) {
  return <>Account {params.accountId}</>;
}
