import { Link } from "react-router-dom";
import avatar from "../../assets/images/profile.png"
import style from "../../styles/form.module.css"
import { validateRegistraion } from "../../utils/validation";
import { useEffect, useState } from "react";
import convertToBase64 from "../../utils/convert";
import Input from "../Input/Input";

function Register() {

    const [file, setFile] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
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

                        <form className="py-1" onSubmit={(event) => handleSubmit(event)}>
                            <div className="profile flex justify-center py-5">
                                <label htmlFor="profile">
                                    <img className={style.profile_img} src={file || avatar} alt="avtar" />
                                </label>
                                <input type="file" id="profile" onChange={onUpload}/>
                                
                            </div>

                            <div className="inputbox flex flex-col items-center gap-6">
                                <Input type="text" placeholder="Enter Username*" />
                                <Input type="text" placeholder="Enter Email*" />
                                <Input type="password" placeholder="Enter Password*" />
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