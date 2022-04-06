import {gql, useMutation} from "@apollo/client";
import { useReducer, useEffect, ChangeEvent, useState } from "react";
 

interface PostDetails {
    creator: string
    title: string,
    message: string
    file: any | null
    tags:  string
}


interface ActionType{
    type: string
    payload: string | any 
}

interface Props{
    setToken: (token: string | null) => void
}

const ADD_POST = gql`
mutation Add($title: String!, $description: String!, $imageUrl: Upload!, $tags: String!){
  postCreate(input: {
    title: $title
    description: $description
    imageUrl: $imageUrl
    tags: $tags
  }) {
    post {
      title
      description
    }
  }
}
`
export const AddForm = (props: Props) =>{

  const[postData, setPost] = useState()
  
   const [addPost, {data,loading, error}] = useMutation(ADD_POST, {
     onCompleted: (data) =>{
         console.log({
             data,
             loading,
             error
         });
         
         setPost(data)
     }
   })    


   const CREATOR: string = "CREATOR";

   const TITLE: string = "TITLE";

   const MESSAGE: string = "MESSAGE";

   const FILE: string = "FILE";

   const TAGS: string = "TAGS"; 

   const initialState: PostDetails =  {
      creator: "",
      title: "",
      message: "",
      file: null,
      tags: ""
  }

  

  const [load, setLoad] = useState<boolean>(false)

  const reducer = (state:PostDetails, action:ActionType) =>{
     switch(action.type){
         case CREATOR: {
             return {
                 ...state,
                 creator: state.creator = action.payload
             }
         }

         case TITLE: {
             return {
                ...state,
                 title: state.title = action.payload
             }
         }

         case MESSAGE: {
             return {
                ...state,
                 message: state.message = action.payload
             }
         }

         case FILE: {
             return {
                ...state,
                 file: state.file = action.payload
             }
         }

         case TAGS: {
             return {
                ...state,
                 tags: state.tags = action.payload
             }
         }

         default: return state;
     }
  }
  

  const [inputState, dispatch] = useReducer(reducer, initialState);
  
   const creatorEvent = (event: ChangeEvent<HTMLInputElement>) =>{
       dispatch({type:CREATOR, payload: event.target.value});
   }
   
   const titleEvent = (event: ChangeEvent<HTMLInputElement>) =>{
    dispatch({type:TITLE, payload: event.target.value});
}

const messageEvent = (event: ChangeEvent<HTMLTextAreaElement>) =>{
    dispatch({type:MESSAGE, payload: event.target.value});
}

const fileEvent = (event: any) =>{
    dispatch({type:FILE, payload: event.currentTarget.files[0]});
}

const tagEvent = (event: ChangeEvent<HTMLInputElement>) =>{
    dispatch({type:TAGS, payload: event.target.value});
}

console.log(inputState.file);
const submitPost = () =>{

    
    if(!inputState.file){
        setLoad(false)
         return alert("Please add an image");
    }
    setLoad(true);
     addPost({
        variables: {
            title: inputState.title,
            description: inputState.message,
            tags: inputState.tags,
            imageUrl: inputState.file
        }
    })
    setLoad(false);
     const token = localStorage.getItem("token");
     console.log(token);
     
     props.setToken(token)
    clearForm();
    
}

const [clear, setClear] = useState<boolean>(false)
const clearForm  =() =>{
   inputState.creator ="";
   inputState.title = "";
   inputState.message= ""
   inputState.file = null
   inputState.tags= ""
  setClear(prev => !prev); 
}


    return (
        <form className="flex flex-col w-72  h-96 space-y-3 shadow-xl justify-center items-center mr-10" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
            <h2 className="text-base tracking-wide font-bold">Share your Travel</h2>
            <input className="border-2 border-black p-1 w-64" type="text" placeholder="creator" value={inputState.creator} onChange ={creatorEvent} />
            <input type="text" placeholder="Title" className="border-2 border-black p-1 w-64" value={inputState.title} onChange= {titleEvent} />
            <textarea cols={20} placeholder= "Message" className="border-2 border-black p-1 resize-none w-64" value={inputState.message} onChange ={messageEvent} />
            <input type="text" placeholder="Tags" className="border-2 border-black p-1 w-64" value={inputState.tags} onChange ={tagEvent} />
            <input type="file" className="p-1 ml-9 cursor-pointer"  onChange ={fileEvent} />
             {load ?  <button className="bg-blue-300 text-base text-white p-1 w-64" onClick={submitPost} >submit....</button>:   <button className="bg-blue-300 text-base text-white p-1 w-64" onClick={submitPost} >submit</button>}
            <button className="bg-red-400 text-white p-1 w-64" onClick={clearForm}>Clear</button>
            
        </form>
    );
}