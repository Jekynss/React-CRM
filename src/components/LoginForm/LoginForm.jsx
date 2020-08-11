import React,{useState} from 'react'
import UsernameInput from '../UsernameInput/UsernameInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import LoginButton from '../LoginButton/LoginButton';

export default function LoginForm() {
    const [user,setUser]=useState({username:'',password:''});

    const handleSubmit=(e)=>{

    }

    const handleChange = (e) =>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value});
      }

    return (
        <form onSubmit={handleSubmit}>
            <UsernameInput user={user} handleChange={handleChange}/>
            <PasswordInput user={user} handleChange={handleChange}/>
            <LoginButton/>
        </form>
    )
}
