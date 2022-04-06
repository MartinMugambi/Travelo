import { Post } from ".prisma/client"
import { Context } from "../.."

import cloudinary from "cloudinary"
import { uploadFile } from "../../utils/uploadFiles"
  
interface PostArgs{
   input:{
    title: string
    description: string
    imageUrl: {
        filename: any,
        mimetype:any,
        createReadStream: any
    }
    tags: string,
    file:any
   }   
}

interface PostPayLoadType{
   userError: {
       message: string
   }

   post: Post | null
}


interface FileArgs{
    file: any
}
 

export const postResolver = {

    postCreate: async (parent:any,  {input}: PostArgs, {prisma, userInfo}:Context): Promise<PostPayLoadType> =>{
     
        if(!userInfo){
           
            return {
                userError: {
                    message: "user is unauthorized"
                },
                post: null
            }
        }
        
        
        const {title, description, imageUrl, tags} = input;
        if(!title || !description || !tags || !imageUrl){
            return {
                userError: {
                    message: "enter all post details"
                },
                post: null,
            }
        }      

           const file = await uploadFile(imageUrl);
             
           const image = String(file);


           if(!file){
               return {
                   userError: {
                       message: "failed to upload image"
                   },
                   post: null,
               }
           }
            
             
             const post = await prisma.post.create({
                data: {
                    title,
                    description,
                    imageUrl: image,
                    tags,
                    user_id: userInfo.user_id
                    
                }
            });

            return {
                userError: {
                    message: "post created successfully",
    
                },
                post: post
            }
            
          },   
        
        }

