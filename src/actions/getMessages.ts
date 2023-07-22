import prismaDb from "@/lib/db";

const getMessages = async (conversationId: string) => {
    try {
        const messages = await prismaDb.message.findMany({
            where: {
                id: conversationId
            },
            include: {
                seen: true,
                sender: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return messages
    } catch (error) {
    return []        
    }
}

export default getMessages