
import React from "react";
import MemberDetail from "./member-detail";
import MembersMyDataTabs from "./tabs";

export default function MyDataLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div>
            <div className="w-full">
                <MemberDetail />
            </div>
            <div className="w-full">
            <MembersMyDataTabs />
            {children}
            </div>
        </div>
    );
}