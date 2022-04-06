import { Context } from ".."

interface UserParentType{
    id: number
} 

export const User = {

    post: async (parent:UserParentType, args: any, {prisma, userInfo}: Context) =>{
     
        console.log();
        
        return prisma.post.findUnique({
            where: {
                id: parent.id
            },
        });
        
    }
}