"use server";
import { eq } from "drizzle-orm";
import db from "./drizzle";
import { category } from "./schema";
import { Result, err, ok } from "./typeDefinitions";
import { RunResult } from "better-sqlite3";

export type Category = typeof category.$inferSelect;

export async function getCategories(): Promise<Result<Category[]>> {
  try { 
    const result = await db.select().from(category);
    return ok(result);
  } catch (e: any) {
    return err(e.toString());
  }
}

export async function addCategory(name: string): Promise<Result<Category>> {
  try {
    const result = await db.insert(category).values({ name }).returning({
      id: category.id,
      name: category.name,
    });

    return ok(result[0]);
  } catch (e: any) {
    return err(e.toString());
  }
}

export async function deleteCategory(id: number): Promise<Result<RunResult>> {
  try {
    const result = await db.delete(category).where(eq(category.id, id));

    return ok(result);
  } catch (e: any) {
    return err(e.toString());
  }
}

export async function updateCategory(
  id: number,
  name: string,
): Promise<Result<Category>> {
  try {
    const result = await db
      .update(category)
      .set({ name })
      .where(eq(category.id, id))
      .returning({ id: category.id, name: category.name });
    return ok(result[0]);
  } catch (e: any) {
    return err(e.toString());
  }
}
