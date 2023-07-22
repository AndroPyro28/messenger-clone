import React, { ReactNode, FC, ReactElement } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/actions/getCurrentUser";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = async ({
  children,
}): Promise<ReactElement> => {

  const currentUser = await getCurrentUser();
  
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser}/>
      <MobileFooter/>
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
