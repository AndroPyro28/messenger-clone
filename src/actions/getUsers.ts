import prismaDb from "@/lib/db";
import getSession from "./getSession";

const getUsers = async () => {
    const session = await getSession();
    if(!session?.user?.email) {
         return []
    }

    try {
        const users = await prismaDb.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                email: {
                    not: session.user.email
                }
            }
        })
        return users
    } catch (error) {
        return []
    }
};

export default getUsers