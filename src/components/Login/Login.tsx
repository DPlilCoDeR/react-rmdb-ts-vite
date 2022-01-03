import React, { FunctionComponent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//Components
import Button from "../Button/Button";

//Styles
import { Wrapper } from "./Login.styles";

//Context
import { Context } from "../../context";

const Login: FunctionComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [_user, setUser] = useContext(Context)
    const navigate = useNavigate();


    const handleSubmit = () => {
        try {
            
        } catch (error) {
            setError(true)
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        name === 'username' ? setUsername(value) : setPassword(value);
    }

    return (
        <Wrapper>
            <label>Username: </label>
            <input 
                type="text" 
                name="username" 
                value={username}
                onChange={handleInput}
            />
            <label>Password: </label>
            <input 
            type="password"
            value={password}
            name="password"
            onChange={handleInput}
            />
            <Button text="Login" callback={handleSubmit}/>
        </Wrapper>
    );
}

export default Login;