import type { Metadata } from "next";
import { Notifications } from "../lib/NotificationManager/NotificationManager";
import ResizableSidebar from "../components/ResizableSidebar/ResizableSidebar";
import { Header } from "@/components/Header/Header";
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
          <div>
            <Header />
            {children}
          </div>
          <ResizableSidebar />
        </Notifications>
      </body>
    </html>
  );
}
