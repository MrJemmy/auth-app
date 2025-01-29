import { Link } from "react-router-dom";
import style from "../../styles/form.module.css"
import { useEffect, useRef, useState } from "react";

function Login() {

    const identifierRef = useRef();
    const errRef = useRef();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");


    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        identifierRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="container mx-auto">

                <div className="flex justify-center items-center h-screen">
                    <div className={style.glass}>
                        <div className="title flex flex-col items-center">
                            <h1 className="text-5xl font-bold">Hello Again!</h1>
                            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                                Explore More by connecting with us.
                            </span>
                        </div>

                        <form className="py-1" onSubmit={handleSubmit}>

                            <div className="inputbox flex flex-col items-center gap-6">
                                <input
                                    className={style.textbox}
                                    type="text"
                                    ref={identifierRef}
                                    autoComplete="off"
                                    value={identifier}
                                    placeholder="Enter Username or Email"
                                    onChange={(e) => setIdentifier(e.target.value)} 
                                />
                                <input
                                    className={style.textbox}
                                    type="password"
                                    autoComplete="off"
                                    value={password}
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                                <input className={style.btn} type="submit" value="Sign Up" />
                            </div>


                            <div className="text-center py-4">
                                <p className="text-gray-500">Not a Member <Link className="text-red-500" to="/register">Register Now</Link></p>
                                <p className="text-gray-500">Forgot Password <Link className="text-red-500" to="/otp">Reset Now</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;