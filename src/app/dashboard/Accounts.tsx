import { getAccountNames } from "@/db/account";
import Link from "next/link";

interface IShortAccountsListProps {
  children: React.ReactNode;
}

function ShortAccountsList({ children }: IShortAccountsListProps) {
  return (
    <>
      <h2>Accounts</h2>
      {children}
    </>
  );
}

export async function ShortAccounts() {
  "use server";
  const res = await getAccountNames();
  let body: React.ReactNode;

  if (res.status === "ok") {
    if (res.data.length === 0) {
      body = <h4>No acounts currently exist.</h4>;
    }

    body = (
      <ul>
        {res.data.map((account) => (
          <li key={account.id}>
            <Link href={`/dashboard/account/${account.id}`} key={account.id}>
              {account.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    // res.status === "error"
    body = <h4>Could not retrieve accounts at this time. Try again.</h4>;
  }

  return <ShortAccountsList children={body} />;
}
