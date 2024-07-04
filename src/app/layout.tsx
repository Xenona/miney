import type { Metadata } from "next";
import { Notifications } from "./lib/NotificationManager/NotificationManager";
import ResizableSidebar from "./components/ResizableSidebar/ResizableSidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miney",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Notifications>
          <div>{children}</div>
          <ResizableSidebar />
        </Notifications>
      </body>
    </html>
  );
}
