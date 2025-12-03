"use client";

import { type ReactNode } from "react";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

type DashboardLayoutPageProps = {
  children: ReactNode;
};

export default function DashboardLayoutPage({
  children,
}: DashboardLayoutPageProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

