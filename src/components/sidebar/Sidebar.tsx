import React, { ReactNode, FC, ReactElement } from "react";
import DesktopSidebar from "./DesktopSidebar";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = async ({
  children,
}): Promise<ReactElement> => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileFooter/>
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
