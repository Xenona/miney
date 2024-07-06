"use client";

import {
  Category,
  addCategory,
  deleteCategory,
  getCategories,
} from "@/db/category";
import { Suspense, useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import {
  useNotificationManager,
} from "../../../lib/NotificationManager/NotificationManager";
import CategoryRow from "./CategoryRow";
import AddCategoryForm from "./AddCategoryForm";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const notificationManager = useNotificationManager();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();

      if (res.status === "ok") {
        setCategories(res.data);
      } else {
        // res.status === 'error'
        notificationManager.addNotification({
          type: "Error",
          body: "Could not retrieve categories. Try refreshing the page.",
          devInfo: res.message,
        });
      }
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: number, name: string) => {
    try {
      await deleteCategory(id);
      notificationManager.addNotification({
        type: "Success",
        body: `Successfully deleted category '${name}'.`,
        expiresInMs: 1000,
      });
      setCategories(categories.filter((c) => c.id !== id));
    } catch {
      notificationManager.addNotification({
        type: "Error",
        body: "Could not delete the category. Try again.",
        expiresInMs: 1000,
      });
    }
  };

  return (
    <article>
      <h2>Categories</h2>

      <div>
        <AddCategoryForm setCategories={setCategories} />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {categories.length ? categories.map((c) => (
            <CategoryRow
              key={c.id}
              category={c}
              onDelete={handleDeleteCategory}
            />
          )) : <h4>No categories currently exist. </h4>}
        </div>
      )}
    </article>
  );
}
