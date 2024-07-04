"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Form from "../Form/Form";
import {
  IRawNotification,
  useNotificationManager,
} from "@/app/lib/NotificationManager/NotificationManager";
import { addCategory, Category } from "@/db/category";

export function validateNameOrError(rawName: any): string | IRawNotification[] {
  const res: IRawNotification[] = [];

  if (!rawName || typeof rawName !== "string" || rawName.trim() === "") {
    res.push({
      type: "Warning",
      body: "Enter valid name for the category.",
      expiresInMs: 1000,
    });
  }

  if (rawName.length > 50) {
    res.push({
      type: "Warning",
      body: "Name should not exceed 50 characters.",
      expiresInMs: 1000,
    });
  }

  if (res.length) {
    return res;
  }
  return rawName.trim();
}

interface IAddCategoryFormProps {
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

export default function AddCategoryForm({
  setCategories,
}: IAddCategoryFormProps) {
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const notificationManager = useNotificationManager();

  const handleAddCategory = async (f: FormData) => {
    setIsAddingCategory(true);

    const rawName = f.get("categoryName");
    const nameOrErrors: string | IRawNotification[] =   
      validateNameOrError(rawName);
    if (Array.isArray(nameOrErrors)) {
      notificationManager.addNotifications(...nameOrErrors);
      setIsAddingCategory(false);
      return;
    }
    const validName: string = nameOrErrors;

    const res = await addCategory(validName);

    if (res.status === "ok") {
      setCategories((prevCategories) => [...prevCategories, res.data]);
      notificationManager.addNotification({
        type: "Success",
        body: `Category ${nameOrErrors} was successfully added`,
        expiresInMs: 1000,
      });
    } else {
      // res.status === "error"
      let message: string = "An unexpected error occured.";
      if (res.message.includes("NOT NULL")) {
        message = "Enter some valid text";
      }
      if (res.message.includes("UNIQUE")) {
        message = "Name of the category should be unique.";
      }
      notificationManager.addNotification({
        type: "Error",
        body: message,
        expiresInMs: 1000,
      });
    }
    setIsAddingCategory(false);
  };

  return (
    <>
      <Form
        action={handleAddCategory}
        onSubmit={(e) => {
          const form = e.target as HTMLFormElement;
          requestAnimationFrame(() => form.reset());
        }}
      >
        <label>
          Category Name:
          <input name="categoryName" />
        </label>
        <button>Add Category</button>
      </Form>
      {isAddingCategory && <p>Adding the Category name...</p>}
    </>
  );
}
