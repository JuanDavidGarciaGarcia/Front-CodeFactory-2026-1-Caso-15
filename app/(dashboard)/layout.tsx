"use client";

import { DataProvider } from "@/context/DataContext";

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataProvider>{children}</DataProvider>
  );
}
