"use client";
import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
type ConversationListProps = {
  initialItems: FullConversationType[];
};

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  return (
    <aside
      className={clsx(`fixed insert-y-0 pb-20 lg:left-20 lg:w-80 lg:block h-full overflow-y-auto border-r border-gray-200 
    ${isOpen ? "hidden" : "block-w-full left-0"}
    `)}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4 ">
          <div className="text-2xl font-bold text-neutral">Messages</div>
          <div className="rounded-full p-2 bg-gray-200 text-gray-600 cursor-pointer hover:opacity-75 transition">
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId == item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
