import { Category, updateCategory } from "@/db/category";
import { useState } from "react";
import useInput from "../../../lib/hooks/useInput";
import {
  IRawNotification,
  useNotificationManager,
} from "../../../lib/NotificationManager/NotificationManager";
import { validateNameOrError } from "./AddCategoryForm";
import styles from "./Categories.module.css";
import Dialog, { DefaultButtons } from "@/components/Dialog/Dialog";

interface ICategoryRowProps {
  category: Category;
  onDelete: (id: number, name: string) => Promise<void>;
}

export default function CategoryRow({ category, onDelete }: ICategoryRowProps) {
  const notificationManager = useNotificationManager();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDelDialogOpened, setIsDelDialogOpened] = useState<boolean>(false);
  const [name, setName] = useState<string>(category.name);
  const nameInput = useInput({ type: "text", initialValue: name });

  const acceptEditing = async () => {
    const nameOrErrors: string | IRawNotification[] = validateNameOrError(
      nameInput.value,
    );
    if (Array.isArray(nameOrErrors)) {
      notificationManager.addNotifications(...nameOrErrors);
      return;
    }
    const validName: string = nameOrErrors;

    const res = await updateCategory(category.id, validName);
    if (res.status === "ok") {
      setName(res.data.name);
      setIsEditing(false);
    } else {
      // res.status === "error";
      notificationManager.addNotification({
        type: "Error",
        body: "Could not update the category name. Try again.",
        devInfo: res.message,
      });
    }
  };

  return (
    <div key={category.id}>
      {isEditing ? (
        <EditingRow
          acceptEditing={acceptEditing}
          cancelEditing={() => setIsEditing(false)}
        >
          {nameInput.input}
        </EditingRow>
      ) : (
        <StaticRow
          startEditing={() => setIsEditing(true)}
          handleDelete={() => setIsDelDialogOpened(true)}
        >
          <p>{name}</p>
          {isDelDialogOpened && (
            <Dialog close={() => setIsDelDialogOpened(false)}>
              <p>{`Are you sure you want to delete category ${category.name}`}</p>
              <DefaultButtons
                accept={() => {
                  onDelete(category.id, category.name);
                  setIsDelDialogOpened(false);
                }}
                reject={() => setIsDelDialogOpened(false)}
                />
            </Dialog>
          )}
        </StaticRow>
      )}
    </div>
  );
}

interface IStaticRowProps {
  children: React.ReactNode;
  startEditing: () => void;
  handleDelete: () => void;
}

function StaticRow({ children, startEditing, handleDelete }: IStaticRowProps) {
  return (
    <>
      <div className={styles.row}>
        <div>{children}</div>
        <div>
          <button onClick={startEditing}>🖉</button>
        </div>
        <div>
          <button onClick={() => handleDelete()}>🗑</button>
        </div>
      </div>
    </>
  );
}

interface IEditingRowProps {
  children: React.ReactNode;
  acceptEditing: () => void;
  cancelEditing: () => void;
}

function EditingRow({
  children,
  acceptEditing,
  cancelEditing,
}: IEditingRowProps) {
  return (
    <div className={styles.row}>
      <div>{children}</div>
      <div>
        <button onClick={acceptEditing}>✓</button>
      </div>
      <div>
        <button onClick={cancelEditing}>⨯</button>
      </div>
    </div>
  );
}
