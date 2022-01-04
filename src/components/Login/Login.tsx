import React, { FunctionComponent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//Components
import Button from "../Button/Button";

//Styles
import { Wrapper } from "./Login.styles";

//Context
import { Context } from "../../context";
import API from "../../API";

const Login: FunctionComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    // @ts-ignore
    const [_user, setUser] = useContext(Context)
    const navigate = useNavigate();


    const handleSubmit = async () => {
        try {
            
            const requestToken = await API.getRequestToken();
            const sessionId = await API.authenticate(
                requestToken,
                username,
                password
            );

            console.log(sessionId);

            setUser({
                sessionId: sessionId.session_id, username
            })
            navigate('/');

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
            {error && <div className="error">There was a error!</div>}
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