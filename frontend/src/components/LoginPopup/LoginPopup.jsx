import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken, loadCartData } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")
    const [error, setError] = useState("")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""

    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
        setError("")
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        setError("")
        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                await loadCartData(response.data.token);
                setShowLogin(false)
            }
            else {
                const messages = [
                    "User Doesn't exist",
                    "Invalid credentials",
                    "User already exists",
                    "Please enter a valid email",
                    "Please enter a strong password",
                ]
                setError(
                    messages.includes(response.data.message)
                        ? response.data.message
                        : "Unable to sign in. Please try again."
                )
            }
        } catch {
            setError("Unable to reach the server. Check your connection and try again.")
        }

    }



    return (
        <div className='login-popup'>

            <form onSubmit={onLogin} autoComplete="on" className="login-popup-container">


                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                {error && <p role="alert">{error}</p>}
                <div className="login-popup-inputs">


                    {currState === "Login" ? <></> :



                        <input type='text' name='name' value={data.name} onChange={onChangeHandler} placeholder='Your name' autoComplete='name' required />
                    }



                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                        autoComplete="email"
                        required
                    />

                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        autoComplete="current-password"
                        required
                    />




                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-cinndition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy  policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => { setCurrState("Sign Up"); setError("") }}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => { setCurrState("Login"); setError("") }}>Login here</span></p>

                }

            </form>

        </div>
    )
}

export default LoginPopup
