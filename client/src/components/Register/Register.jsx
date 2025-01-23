import { Link } from "react-router-dom";
import avatar from "../../assets/images/profile.png"
import style from "../../styles/form.module.css"
import { useEffect, useRef, useState } from "react";
import convertToBase64 from "../../utils/convert";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Register() {

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false)

    const [file, setFile] = useState();

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(username)
        console.log(result)
        console.log(username)
        setValidUsername(result)
    }, [username])

    useEffect(() => {
        const result = USER_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = USER_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPassword(result)
        const match = (password === matchPassword)
        setValidMatch(matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg("")
    }, [username, email, password, matchPassword])

    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center items-center h-screen">
                    <div className={style.glass}>
                        <div className="title flex flex-col items-center">
                            <h1 className="text-5xl font-bold">Register</h1>
                            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                                Happy to join you!
                            </span>
                        </div>

                        <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>

                        <form className="py-1" onSubmit={handleSubmit}>
                            <div className="profile flex justify-center py-5">
                                <label htmlFor="profile">
                                    <img className={style.profile_img} src={file || avatar} alt="avtar" />
                                </label>
                                <input type="file" name="profile" id="profile" onChange={onUpload} />

                            </div>

                            <div className="inputbox flex flex-col items-center gap-6">
                                <input
                                    className={style.textbox}
                                    type="text"
                                    autoComplete="off"
                                    ref={usernameRef}
                                    placeholder="Enter Username*"
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    aria-invalid={validUsername ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUsernameFocus(true)}
                                    onBlur={() => setUsernameFocus(false)}
                                />
                                <FontAwesomeIcon icon={faCheck} className={validUsername ? style.valid : style.hide} />
                                <FontAwesomeIcon icon={faTimes} className={!validUsername && username ? style.valid : style.hide} />

                                <span id="uidnote" className={usernameFocus && username && !validUsername ? style.instructions : style.offscreen}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </span>

                                <input className={style.textbox} type="text" placeholder="Enter Email*" />
                                <input className={style.textbox} type="password" placeholder="Enter Password*" />
                                <input className={style.btn} type="submit" value="Sign Up" />
                            </div>


                            <div className="text-center py-4">
                                <p className="text-gray-500">Already Register? <Link className="text-red-500" to="/login">Login Now</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;