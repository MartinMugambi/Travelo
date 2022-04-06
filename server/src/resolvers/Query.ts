import { Context } from ".."

export const Query = {
    hello: () =>{
        return  "Hello World"
    },

    posts: async (parent:any, args:any, {prisma}:Context)  =>{
      
        const post = await prisma.post.findMany({
          select: {
              id: true,
              title: true,
              description: true,
              imageUrl: true,
              tags: true,
          }      
        });

        return post;
    },

    me: async (parent:any, args:any, {prisma, userInfo}:Context) =>{

        if(!userInfo){
            return  "user is not authorized"
        }

        return await prisma.user.findUnique({
            where: {
                id: userInfo.user_id,
            }
        })
    },


}


 