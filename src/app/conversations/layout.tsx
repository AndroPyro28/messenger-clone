import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";
import ConversationList from "./components/ConversationList";
import getConversations from "@/actions/getConversations";

async function ConversationLayout({ children }: { children: React.ReactNode }) {

  const conversation = await getConversations()
  return (
    <Sidebar>
        <ConversationList
            initialItems={conversation}
        />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}

export default ConversationLayout;
