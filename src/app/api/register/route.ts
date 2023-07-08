import { hash } from "@/helper/bcrypt";
import prismaDB from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return new NextResponse("missing info", { status: 400 });
    }

    const hashedPassword = await hash(password);

    const user = await prismaDB.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error, "REGISTRATION ERROR");
    return new NextResponse("email is already exist", { status: 400 });
  }
};
