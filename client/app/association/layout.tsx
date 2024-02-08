import AssociationTabs from "./tabs";
import React from "react";

export default function AssociationLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div>
            <div className="flex flex-wrap gap-4 p-4 ">
            <AssociationTabs />
            </div>
            {children}
        </div>
    );
}