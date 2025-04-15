import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "../globals.css";
import DashboardSidebar from "@/features/dashboard/DashboardSidebar";
import { Inter } from "next/font/google";
import Session from "@/features/dashboard/Session";

const inter = Inter({ subsets: ["latin"] });

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      {/* <Session> */}
        <DashboardSidebar />
        <div className="w-full">
          <SidebarTrigger />
          {children}
        </div>
      {/* </Session> */}
    </SidebarProvider>
  );
};

export default DashboardLayout;
