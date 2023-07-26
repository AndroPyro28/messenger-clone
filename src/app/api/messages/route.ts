import authorized from "@/helper/authorized";
import prismaDB from "@/lib/db";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await authorized() as User
    const {message, image, conversationId} = await req.json()

    const newMessage = await prismaDB.message.create({
        data: {
            body: message,
            image,
            seen: {
                connect: {
                    id: currentUser.id
                }
            },
            conversation: {
                connect: {
                    id:conversationId
                }
            },
            sender: {connect: {
                id:  currentUser.id
            }}
        },
        include:{
            seen: true,
            sender: true
        }
    })

    const updateConversation = await prismaDB.conversation.update({
        where: {
            id: conversationId,
        },
        data: {
            lastMessageAt: new Date(),
            messages: {
                connect: {
                    id: newMessage.id
                }
            }
        },
        include: {
            users: true,
            messages: {
                include: {
                    seen: true
                }
            }
        }
    })

    return NextResponse.json(newMessage);

    
  } catch (error) {
    console.error("MESSAGES_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
