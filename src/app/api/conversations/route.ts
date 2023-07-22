import { NextResponse } from "next/server";
import prismaDB from "@/lib/db";
import authorized from "@/helper/authorized";
import getCurrentUser from "@/actions/getCurrentUser";
import { sign } from "crypto";

export const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId, isGroup, members, name } = await req.json();

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("invalid data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prismaDB.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversation);
    }

    const existingCoversations = await prismaDB.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });
    const singleConversation = existingCoversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prismaDB.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("internal Error", { status: 500 });
  }
};
