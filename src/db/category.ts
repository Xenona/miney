"use server";
import { eq } from "drizzle-orm";
import db from "./drizzle";
import { category } from "./schema";
import { Result, Err, Ok } from "./typeDefinitions";
import { RunResult } from "better-sqlite3";

export type Category = typeof category.$inferSelect;

export async function getCategories(): Promise<Result<Category[]>> {
  try {
    const result = await db.select().from(category);
    return Ok(result);
  } catch (e: any) {
    return Err(e.toString());
  }
}

export async function addCategory(name: string): Promise<Result<Category>> {
  try {
    const result = await db.insert(category).values({ name }).returning({
      id: category.id,
      name: category.name,
    });

    return Ok(result[0]);
  } catch (e: any) {
    return Err(e.toString());
  }
}

export async function deleteCategory(id: number): Promise<Result<RunResult>> {
  // TODO: think about moving paymets to some 'empty' category if their cat was deleted
  try {
    const result = await db.delete(category).where(eq(category.id, id));
    return Ok(result);
  } catch (e: any) {
    return Err(e.toString());
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
    return Ok(result[0]);
  } catch (e: any) {
    return Err(e.toString());
  }
}
