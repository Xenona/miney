import db from "./drizzle";
import { account } from "./schema";
import { Err, Ok, Result } from "./typeDefinitions";

export type Account = typeof account.$inferSelect;

export async function addAccount({
  name,
  ...other
}: {
  name: string;
  description?: string;
}): Promise<Result<Account>> {
  try {
    const res = await db
      .insert(account)
      .values({ name, ...other })
      .returning({
        id: account.id,
        name: account.name,
        description: account.description,
      });
    return Ok(res[0]);
  } catch (e: any) {
    return Err(e.toString());
  }
}

export async function getAccount(id: number) {}

export async function getAccountNames(): Promise<
  Result<{ id: number; name: string }[]>
> {
  try {
    const res = await db.select({ id: account.id, name: account.name }).from(account);
    return Ok(res);
  } catch (e: any) {
    return Err(e.toString());
  }
}
