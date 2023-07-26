import authorized from "@/helper/authorized"
import prismaDB from "@/lib/db";
import { User } from "@prisma/client";
import { NextResponse } from "next/server"

interface IParams {
    conversationId?: string
}

export async function POST(request: Request, {params}: {params: IParams}) {
    try {
        const currentUser = await authorized() as User;
        const { conversationId } = params;

        const conversation = await prismaDB.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users:true,
                messages:{
                    include:{
                        seen: true
                    }
                },
            }
        })

        if(!conversation) {
            return new NextResponse('Invalid ID', {status:400});
        }

        //find the last message
        const lastMessage = conversation.messages[conversation.messages.length - 1];


        if(!lastMessage) {
            return NextResponse.json(conversation);
        }

        // seen of last message

        const updatedMessage = await prismaDB.message.update({
            where: {
                id: lastMessage.id
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender:true,
                seen: true
            }
        })

        return NextResponse.json(updatedMessage);
    } catch (error) {
        console.error(error, "ERRPR MESSAGES SEEN")
        return new NextResponse('Internal Error', {status: 500})
    }   
}