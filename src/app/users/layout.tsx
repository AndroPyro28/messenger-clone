import Sidebar from "@/components/sidebar/Sidebar";
import React, { ReactNode } from "react";

type UsersLayoutProps = {
  children: ReactNode;
};
async function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}

export default UsersLayout;
