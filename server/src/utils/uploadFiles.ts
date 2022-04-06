import cloudinary from "cloudinary";
import { api_key, api_secret, cloud_name } from "../keys";

cloudinary.v2.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
});

export const uploadFile =  async (imageUrl: any) =>{
    
    const {createReadStream} = await imageUrl;

    const result:cloudinary.UploadApiResponse | undefined  = await new Promise((resolve, reject)=>{
             
        createReadStream().pipe(
            cloudinary.v2.uploader.upload_stream((error, result)=>{
                
                if(error){
                    reject(error)
                }

                resolve(result)

            })
        )
     });

     return  result?.secure_url;
}