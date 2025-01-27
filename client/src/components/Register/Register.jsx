import { Link } from "react-router-dom";
import avatar from "../../assets/images/profile.png"
import style from "../../styles/form.module.css"
import { useEffect, useRef, useState } from "react";
import convertToBase64 from "../../utils/convert";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

function Register() {

    const REGISTER_URL = "/user/register"
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const usernameRef = useRef();
    const errRef = useRef();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
        setIsButtonDisabled(validUsername && validEmail && validPassword && validMatch ? false : true)
    })

    useEffect(() => {
        const result = USER_REGEX.test(username)
        setValidUsername(result)
    }, [username])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        setValidPassword(result)
        const matchResult = (password === matchPassword && password!="")? true : false
        setValidMatch(matchResult)
        
    }, [password, matchPassword])


    useEffect(() => {
        setErrMsg("")
    }, [username, email, password, matchPassword])

    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL, 
                {
                    username,
                    email,
                    password,
                }
            )
            console.log(response.data)
        } catch (error) {
            if(!error?.response){
                setErrMsg("no server response")
            }else if(error.response?.status == 409){
                setErrMsg("username already registered")
            }else{
                setErrMsg("server error, registration faild")
            }
        }
        // call API then redirect to login page if successful
        setSuccess(true)
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

                            <div className="flex flex-col items-center gap-4">
                                <div className="inputbox">
                                    <input
                                        className={style.textbox}
                                        type="text"
                                        autoComplete="off"
                                        ref={usernameRef}
                                        placeholder="Enter Username*"
                                        onChange={(e) => setUsername(e.target.value)}
                                        spellCheck="false"
                                        aria-invalid={validUsername ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUsernameFocus(true)}
                                        onBlur={() => setUsernameFocus(false)}
                                    />
                                    <FontAwesomeIcon icon={faCheck} className={validUsername ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!validUsername && username ? style.invalid : style.hide} />

                                    <p id="uidnote" className={usernameFocus && username && !validUsername ? style.instructions : style.offscreen}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        4 to 24 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>
                                </div>

                                <div className="inputbox">
                                    <input
                                        className={style.textbox}
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Enter Email*"
                                        onChange={(e) => setEmail(e.target.value)}
                                        spellCheck="false"
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="emailnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!validEmail && email ? style.invalid : style.hide} />

                                    <p id="emailnote" className={emailFocus && email && !validEmail ? style.instructions : style.offscreen}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        min 2 characters for top-level domain<br />
                                        Must inclue @ befor domain name<br />
                                        only dot(.), underscore(_), percent(%), plus(+) allowed.
                                    </p>
                                </div>

                                <div className="inputbox">
                                    <input
                                        className={style.textbox}
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Enter Password*"
                                        onChange={(e) => setPassword(e.target.value)}
                                        aria-invalid={validPassword ? "false" : "true"}
                                        aria-describedby="passwordnote"
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    <FontAwesomeIcon icon={faCheck} className={validPassword ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!validPassword && password ? style.invalid : style.hide} />

                                    <p id="passwordnote" className={passwordFocus && password && !validPassword ? style.instructions : style.offscreen}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.
                                        Must include uppercase and lowercase letters, a number and a special character.
                                        Allowed special characters: ! @ # %
                                    </p>
                                </div>

                                <div className="inputbox">
                                    <input
                                        className={style.textbox}
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Conform Password*"
                                        onChange={(e) => setMatchPassword(e.target.value)}
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    <FontAwesomeIcon icon={faCheck} className={validMatch ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!validMatch && matchPassword ? style.invalid : style.hide} />

                                    <p id="confirmnote" className={matchFocus && matchPassword && !validMatch ? style.instructions : style.offscreen}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Must match the first password input field.
                                    </p>
                                </div>
                                {/*  disabled={isButtonDisabled}  */}
                                <input className={`${style.btn} ${isButtonDisabled ? style.btnDisabled : {}}`} type="submit" value="Sign Up" />
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