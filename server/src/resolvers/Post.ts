import { Context } from ".."

interface PostParentType{
    user_id: number
} 

export const Post = {

    user: async (parent:PostParentType, args: any, {prisma, userInfo}: Context) =>{
     
         console.log(parent);
         
        return prisma.user.findUnique({
            where: {
                id: parent.user_id
            },
        });
        
    }
}