"use client";
import { createContext, useContext, useState } from "react";

export type NotificationType = "Warning" | "Success" | "Error" | "Info";

export interface INotification {
  type: NotificationType;
  title?: string;
  body: any;
  expiresInMs: number | undefined;
  createdOn: number;
}

export interface IRawNotification {
  type: NotificationType;
  body: any;
  title?: string;
  expiresInMs?: number;
  devInfo?: any;
}

interface INotifManager {
  notifications: INotification[];
  addNotification: (rawN: IRawNotification) => void;
  rmNotification: (createdOn: number) => void;
}

const NotificationContext = createContext<INotifManager>({
  notifications: [],
  addNotification: () => {
    throw new Error("Check the existence of the context provider");
  },
  rmNotification: () => {
    throw new Error("Check the existence of the context provider");
  },
});

interface INotificationProps {
  children: React.ReactNode;
}

export function Notifications({ children }: INotificationProps) {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  return (
    <>
      <NotificationContext.Provider
        value={{
          notifications,
          addNotification: ({
            expiresInMs = undefined,
            ...rawN
          }: IRawNotification) => {
            const n: INotification = {
              ...rawN,
              createdOn: Date.now(),
              expiresInMs,
            };

            setNotifications([...notifications, n]);
            if (!n.expiresInMs) return;
            setTimeout(() => {
              setNotifications((oldNs) =>
                oldNs.filter((oldN) => oldN.createdOn !== n.createdOn),
              );
            }, n.expiresInMs);
          },
          rmNotification: (createdOn: number) => {
            setNotifications((oldNs) =>
              oldNs.filter((oldN) => oldN.createdOn != createdOn),
            );
          },
        }}
      >
        <>{children}</>
      </NotificationContext.Provider>
    </>
  );
}

export const useNotificationManager = () => {
  const ctx = useContext(NotificationContext);

  return {
    addNotification: ctx.addNotification,
    addNotifications: (...rawNs: IRawNotification[]) => {
      rawNs.forEach((rn) => ctx.addNotification(rn));
    },
    rmNotification: ctx.rmNotification,
    notifications: ctx.notifications,
  };
};
