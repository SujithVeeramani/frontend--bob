import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [UsernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [validationError, setValidationError] = useState("")
    const navigate = useNavigate();

    const onButtonClick = () => {

        setUsernameError("")
        setPasswordError("")

        if ("" === username) {
            setUsernameError("Please enter your username")
            return
        }


        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        logIn()


    }

    const logIn = async () => {
        try {
            const response = await axios.post('https://spotless-pullover-hen.cyclic.app/login', {
                username,
                password,
            });
            if (response.data.status === "success") {
                console.log('Login successful:', response.data);
                setValidationError("")
                localStorage.setItem("user",JSON.stringify(response.data.data[0]))
                navigate(`/home`);
            } else {
                setValidationError(response.data.message)
            }

        }
        catch (error) {
            setValidationError("Login failed please try again")
        }
    };





    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div>
            {validationError}
        </div>

        <div className={"inputContainer"}>
            <input
                value={username}
                placeholder="Enter your username here"
                onChange={ev => setUsername(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{UsernameError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>
}

export default Login