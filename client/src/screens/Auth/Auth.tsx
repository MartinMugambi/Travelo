import { Form } from "../../components/form/form";


interface Props{
    state: boolean
    setToken: (token: string) => void
}

export const AuthForm = (props: Props) =>{
    return (
        <div>
         <Form state ={props.state} setToken= {props.setToken}/>
        </div>
    );
}