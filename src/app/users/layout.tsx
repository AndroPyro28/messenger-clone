import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import React, { ReactNode } from "react";
import UserList from "./components/UserList";

type UsersLayoutProps = {
  children: ReactNode;
};
async function UsersLayout({ children }: UsersLayoutProps) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
        </div>
    </Sidebar>
  );
}

export default UsersLayout;
