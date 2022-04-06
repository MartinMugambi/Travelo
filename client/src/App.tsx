import React, { useEffect, useState } from 'react';
import { Header } from './components/header/header';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom" 
import { AuthForm } from './screens/Auth/Auth';
import { Posts } from './screens/posts/posts';


const App = () =>{
  const[state, setState]= useState<boolean>(true);
 
  const [token, setToken] = useState<string | null | undefined>();

  useEffect(()=>{

    const browserToken = localStorage.getItem("token");

    setToken(browserToken)
    
  },[token])

 return (
   <Router>
   
   <div>
    <Header setState= {setState} state={state}  token = {token} setToken ={setToken}/>
    {/* <Form2 /> */}
     <Routes>
       <Route path='/auth' element={<AuthForm state= {state} setToken = {setToken}/>} />
       <Route path='/' element= {<Posts token = {token} setToken = {setToken} />} />
     </Routes>
    
   </div>
  //  </Router>
 );  
}

export default App;