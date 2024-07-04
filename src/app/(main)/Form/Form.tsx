import { FormEvent } from "react";
import styles from "./Form.module.css"

export default function Form({
  action,
  children,
  onSubmit
}: {
  action: (f: FormData) => void;
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return <form action={action} onSubmit={onSubmit}>{children}</form>;
}
