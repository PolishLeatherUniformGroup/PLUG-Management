import AdminTabs from "./tabs";
import React from "react";

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div>
            <div className="flex flex-wrap gap-4 p-4 ">
            <AdminTabs />
            </div>
            {children}
        </div>
    );
}