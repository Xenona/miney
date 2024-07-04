import { Category, updateCategory } from "@/db/category";
import { useState } from "react";
import useInput from "../../lib/hooks/useInput";
import { IRawNotification, useNotificationManager } from "../../lib/NotificationManager/NotificationManager";
import { validateNameOrError } from "./AddCategoryForm";

interface ICategoryRowProps {
  category: Category;
  onDelete: (id: number, name: string) => Promise<void>;
}

export default function CategoryRow({ category, onDelete }: ICategoryRowProps) {
  const notificationManager = useNotificationManager();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(category.name);

  const nameInput = useInput({ type: "text", initialValue: name });
  return (
    <div key={category.id}>
      <div>
        <p>{category.id}</p>
      </div>
      {isEditing ? (
        <>
          <div>{nameInput.input}</div>
          <div>
            <button
              onClick={async () => {
                const nameOrErrors: string | IRawNotification[] = validateNameOrError(nameInput.value);
                if (Array.isArray(nameOrErrors)) {
                  notificationManager.addNotifications(...nameOrErrors);
                  return;
                }
                const validName: string = nameOrErrors;

                const res = await updateCategory(category.id, validName);
                if (res.status === 'ok') {
                  setName(res.data.name);
                  setIsEditing(false);
                } else {
                  // res.status === "error";
                  notificationManager.addNotification({
                    type: 'Error',
                    body: "Could not",
                    devInfo: res.message
                  })  
                }
              }}
            >
              ✓
            </button>
          </div>
          <div>
            <button onClick={() => setIsEditing(false)}>⨯</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>{name}</p>
          </div>
          <div>
            <button onClick={() => setIsEditing(true)}>🖉</button>
          </div>
          <div>
            <button onClick={() => onDelete(category.id, category.name)}>🗑</button>
          </div>
        </>
      )}
    </div>
  );
}
