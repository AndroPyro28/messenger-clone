import getCurrentUser from "@/actions/getCurrentUser";
import prismaDB from "@/lib/db";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

 const authorized = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return currentUser as User
};

export default authorized