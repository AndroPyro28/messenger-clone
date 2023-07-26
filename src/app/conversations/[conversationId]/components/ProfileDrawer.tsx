"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Transition, Dialog } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";

type ProfileDrawerProps = {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
};

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ data, isOpen, onClose }) => {

    const otherUser = useOtherUser(data);
    const joinedData = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data?.name || otherUser.name
    }, [ data?.name, otherUser.name ])

    const statusText= useMemo(( ) => {
        if(data?.isGroup) {
            return `${data.users.length} members`
        }
        return 'active'
    },[data])
  return <Transition.Root show={isOpen} as={Fragment} >
    <Dialog as={'div'} className={'relative z-50'} onClose={onClose}></Dialog>
  </Transition.Root>;
};

export default ProfileDrawer;
