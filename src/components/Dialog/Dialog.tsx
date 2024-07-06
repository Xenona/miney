import { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";

interface IDialogProps {
  close: () => void;
  children: React.ReactNode;
}

export default function Dialog({ close, children }: IDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, [dialogRef]);

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          close();
        }
      }}
    >
      {children}
    </dialog>
  );
}

interface IDefaultButtons {
  accept: () => void;
  reject: () => void;
  children?: React.ReactNode;
}

export const stylesDialogButton = styles.dialogButton;
export function DefaultButtons({
  accept,
  reject,
  children,
}: IDefaultButtons) {
  return (
    <div className={styles.dialogButtons}>
      <button className={styles.dialogButton} onClick={accept}>
        Proceed
      </button>
      <button className={styles.dialogButton} onClick={reject}>
        Cancel
      </button>
      {children && children}
    </div>
  );
}
