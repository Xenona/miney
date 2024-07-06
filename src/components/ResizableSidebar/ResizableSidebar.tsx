'use client'
import styles from "./ResizableSidebar.module.css";
import { useNotificationManager } from "@/lib/NotificationManager/NotificationManager";

export interface IResizableSidebarProps {
  children?: React.ReactNode;
}

export default function ResizableSidebar({ children }: IResizableSidebarProps) {
  const notificationManager = useNotificationManager();
    
  return (
    <div className={styles.resizableSidebar}>
      {notificationManager.notifications.map(
        ({ type, body, title, createdOn }) => {
          return (
            <div key={`${type}-${body}-${createdOn}`}>
              {title && <h4>{title}</h4>}
              <button onClick={() => notificationManager.rmNotification(createdOn)}>⨯</button>
              <p>{`${type}: ${body}`}</p>
            </div>
          );
        },
      )}
    </div>
  );
}
