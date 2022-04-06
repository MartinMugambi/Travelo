import axios from "axios";
import {useNavigate} from "react-router-dom"
interface Props{
    setState: React.Dispatch<React.SetStateAction<boolean>>
    state: boolean
    token: string | null | undefined
    setToken: (token: string | null) => void
}


export const Header = (props: Props) =>{

    const naviagte = useNavigate();

    const logout = () =>{
      localStorage.clear();
      props.setToken(null)
    }

    if(props.token !== null || undefined) {

        return (
            <header className="w-4/5 h-16 shadow-lg rounded-md m-auto p-3 mt-5">
          <div className="flex justify-between text-xl items-center">
              <h1 className="text-xl">Travel Kenya</h1>
              <button onClick={logout}  className="bg-yellow-400 text-white text-sm p-1 rounded cursor-pointer tracking-wide">Logout</button>
          </div>
        </header>
        );

    } 

    const handleClick = () =>{
      naviagte('/auth');
      props.setState(prev => !prev)
    }
    return (
        <>
         {props.state ? <header className="w-4/5 h-16 shadow-lg rounded-md m-auto p-3 mt-5">
          <div className="flex justify-between text-xl items-center">
              <h1 className="text-xl">Travel Kenya</h1>
              <button onClick={handleClick}  className="bg-yellow-400 text-white text-sm p-1 rounded cursor-pointer tracking-wide">SIGN IN</button>
          </div>
        </header> : <header className="w-4/5 h-16 shadow-lg rounded-md m-auto p-3 mt-5">
          <div className="flex justify-between text-xl items-center">
              <h1 className="text-xl">Travel Kenya</h1>
              <button onClick={handleClick}  className="bg-yellow-400 text-white text-sm p-1 rounded cursor-pointer tracking-wide">SIGN UP</button>
          </div>
        </header>} 
        </>
         );
}