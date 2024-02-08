import MembersTabs from "./tabs";
import React from "react";

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-4 p-4 ">
        <MembersTabs />
      </div>
      <div className="w-3/4 mx-auto">
        {children}
      </div>
    </div>
  );
}