import {gql, useMutation} from "@apollo/client"
import { ChangeEvent, useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom"
interface Props{
  state: boolean
  setToken: (token: string) => void
   
}


interface Confrim{
  password: string,
  error: boolean
}

interface AuthDetails{
  username: string,
  email: string,
  password: string
}


interface ActionType{
  type: string,
  payload: string
}

 
const AUTH_QUERY = gql`
mutation Login($email: String!, $password: String!){
  signIn(input: {  email: $email, password: $password}) {
    token
    userErrors {
      message
    }
  }
}
`

const SIGNUP_QUERY = gql`
 mutation SignUP($username: String!, $email: String!, $password: String!){
  signUp(input: {
    username: $username,
    email: $email,
    password: $password
  }) {
    userErrors {
      message
    }
    token
  }
}
`

export const Form = (props: Props) =>{


  const [token, setToken] = useState();

  const [message, setMessage] = useState<string | null>();

  const[loadingForm, setLoading] = useState<boolean>(false)

  const[sigin, {data, loading, error}] = useMutation(AUTH_QUERY, {
    onCompleted: (data) =>{
     
      setToken(data.signIn.token);

      setMessage(data.signIn.userErrors.message)
      
    }
  })

  const [signup, {data:datas ,loading: load, error: err}] = useMutation(SIGNUP_QUERY, {
    onCompleted: (datas) =>{
      setToken(datas.signUp.token);

      setMessage(datas.signUp.userErrors.message)

      console.log(datas);
      

    }
  });
    
    useEffect(()=>{

      if(token){
        localStorage.setItem("token", token);
        setLoading(true);
        props.setToken(token)
        naviagte('/')
        
      } else if (message?.includes("invalid credentials") || message === null){
        setLoading(false);
        console.log("token is here", message);
        console.log("loading is", loadingForm);
        
      }

     
      
    },[token, message])
  
 
  const USER_NAME : string = "USER_NAME";

  const EMAIL: string = "EMAIL";

  const PASSWORD: string = "PASSWORD";

  const  initialState: AuthDetails = {
    username: "",
    email: "",
    password: "",
  }


  const reducer = (state:AuthDetails, action:ActionType) =>{
    
      switch(action.type) {
        
        case USER_NAME: {
          return {
            ...state,
            username: state.username = action.payload,
          }
        }

        case EMAIL : {
          return {
            ...state,
            email: state.email = action.payload
          }
        }

        case PASSWORD :{
          return {
            ...state,
           password: state.password = action.payload
          }
        }

       default: return state;
      }
  }

  const [inputstate, dispatch] =  useReducer(reducer, initialState);

  const [confirm, setConfirm] = useState<Confrim>({
    password: "",
    error: false,
  })

   const usernameEvent = (event: ChangeEvent<HTMLInputElement>) =>{
       
    dispatch({type: USER_NAME, payload: event.target.value});
   }

   const emailEvent = (event: ChangeEvent<HTMLInputElement>) =>{
     dispatch({type: EMAIL, payload: event.target.value})
   }

   const passwordEvent = (event: ChangeEvent<HTMLInputElement>) =>{
     dispatch({type: PASSWORD,payload: event.target.value});
   }

   const confirmPasswordEvent = (event: ChangeEvent<HTMLInputElement>) =>{
     setConfirm({
       password: event.target.value,
       error: false,
     })
   }

    // const {email, password} = inputstate;

    const naviagte = useNavigate();

  if(error) return <p>Loaading here</p>

  const handleClick =  () =>{
     
      sigin({
        variables: {
          email: inputstate.email,
          password: inputstate.password
        } 
        
      }); 
    

         
  }



 const handleSign = () =>{
   if(confirm.password !== inputstate.password) {
    return alert("Password does not match")
   } else {
    signup({
      variables: {
        username: inputstate.username,
        email: inputstate.email,
        password: inputstate.password,
      }
    });

  
   }
  
 }
 
  
        
    return (
        <>
         {props.state ? <form className="w-72 h-80 shadow-lg flex-col m-auto mt-4 p-3 space-y-5" onSubmit={(e)=>e.preventDefault()}>
          <h1 className="text-center text-xl">Sign Up</h1>
          <div className="flex space-x-2">
           <input className="outline-none border-2 border-gray-700 w-32 p-1" type="text" placeholder="Username *" value={inputstate.username} onChange ={usernameEvent} />
            <input className="outline-none border-2 border-gray-700 w-32 p-1" type="text" placeholder="email *" value={inputstate.email} onChange= {emailEvent} />
          </div>
          <div className="flex-col space-y-3">
          <input className="outline-none border-2 border-gray-700 w-64 p-1" type="password" placeholder="Password *" value={inputstate.password} onChange ={passwordEvent} />
          <input className="outline-none border-2 border-gray-700 w-64 p-1" type="password" placeholder="Confrim Password *" value={confirm.password} onChange = {confirmPasswordEvent} />
        {loadingForm ?  <button className="bg-blue-400 text-white w-64 block p-1 rounded " onClick={handleSign}>SIGN UP...</button>:  <button className="bg-blue-400 text-white w-64 block p-1 rounded " onClick={handleSign}>SIGN UP</button>}
          </div>
        </form> :
         <form className="w-72 h-72 shadow-lg m-auto mt-4 p-3" onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-center text-xl">Sign In</h1>
          <div className=" flex flex-col space-y-3 h-full justify-center items-center">
          <input className="outline-none border-2 border-gray-700 w-64 p-1" type="text" placeholder="Email Address *" value={inputstate.email} onChange ={emailEvent} />
          <input className="outline-none border-2 border-gray-700 w-64 p-1" type="password" placeholder="Confrim Password *" value={inputstate.password} onChange ={passwordEvent} />
          {loadingForm ? <button className="bg-blue-400 text-white w-64 block p-1 rounded" onClick={handleClick}>Sigin....</button> : <button className="bg-blue-400 text-white w-64 block p-1 rounded" onClick={handleClick}>Sigin</button>}
          </div>
        </form>}
        </>
    );
}