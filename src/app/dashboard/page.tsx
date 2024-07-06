import Categories from "./Categories/Categories";
import { ShortAccounts } from "./Accounts";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";

export default async function Dashboard() {
  return (
    <>
      <main>
        <Categories />
        <Suspense fallback={<Loading />}>
          <ShortAccounts />
        </Suspense>
      </main>
    </>
  );
}
