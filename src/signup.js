import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Signup = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [UsernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [name, setname] = useState("")
    const [nameError, setNameError] = useState("")
    const [email,setEmail]=useState("")
    const [emailerror,setEmailError]=useState("")
    const [validationError, setValidationError] = useState("")
    const navigate = useNavigate();

    const onButtonClick = () => {

        setUsernameError("")
        setPasswordError("")

        if ("" === username) {
            setUsernameError("Please enter your username")
            return
        }
        if ("" === name) {
            setNameError("Please enter a name")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }
        if ("" === email) {
            setEmailError("Please enter a email")
            return
        }
        

        Signup()


    }

    const Signup = async () => {
        try {
            const response = await axios.post('https://spotless-pullover-hen.cyclic.app/signup', {
                username,
                password,
                email,
                name
            });
            if (response.data.status === "success") {
                console.log('Signup successful:', response.data);
                setValidationError("")
                navigate(`/login`);
            } else {
                setValidationError(response.data.message)
            }

        }
        catch (error) {
            setValidationError("please try again")
        }
    };





    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Signup</div>
        </div>
        <br />
       

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
                value={name}
                placeholder="Enter your password here"
                onChange={ev => setname(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{nameError}</label>
        </div>
        <br />

        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailerror}</label>
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

         <div>
            {validationError}
        </div>
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Signup"} />
        </div>
    </div>
}

export default Signup