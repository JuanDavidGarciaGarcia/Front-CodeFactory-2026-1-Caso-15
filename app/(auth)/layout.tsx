"use client";

import { SplitScreenLayout } from "@/components/layout/SplitScreenLayout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SplitScreenLayout>{children}</SplitScreenLayout>
  );
}
