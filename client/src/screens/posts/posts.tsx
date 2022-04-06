import {gql, useQuery} from "@apollo/client";
import { useEffect, useState } from "react";
import { AddForm } from "../../components/addForm/add";
import { Modal } from "../../components/modal/modal";
import { Post } from "../../components/post/post";


const GET_POSTS = gql`
query{
  posts {
    id
    title
    description
    tags
    imageUrl
  }
}
`
interface PostData{
    id: number,
    title: string
    description: string
    tags: string
    imageUrl: string
} 


interface Props{
    token: string | null | undefined
    setToken: (token: string | null) => void
}
export const Posts = (props: Props) =>{


  const {loading, data, error} = useQuery(GET_POSTS);

    if(loading)  return  <p>Loading...</p>

    if(error) return <p>Error loaded</p>

     const {posts} = data;     

     

    const postData: [PostData]   = posts;

    
    // if(props.token !=null || undefined){

    //     return 
    // }

    return (
        <div className="flex flex-row justify-between mt-3">
        <div className="grid grid-cols-3 gap-5 m-auto">
         {postData.map(post => <Post key={post.id} title= {post.title} description = {post.description} tags = {post.tags} imageUrl ={post.imageUrl} />)} 
        </div>
         {props.token === null ?  <Modal />: <AddForm  setToken= {props.setToken}/>}
        </div>
    );
}