import { Link } from "react-router-dom";
import avatar from "../../assets/images/profile.png"
import style from "./login.module.css"


function Login() {
    return (
        <>
            <div className="container mx-auto">
                <div className="flex justify-center items-center h-screen">
                    <div className={style.glass}>
                        <div className="title flex flex-col items-center">
                            <h1 className="text-5xl font-bold">Hello World</h1>
                            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                                Explore More by connecting with us.
                            </span>
                        </div>

                        <form className="py-1">
                            <div className="profile flex justify-center py-5">
                                <img className={style.profile_img} src={avatar} alt="avtar" />
                            </div>

                            <div className="inputbox flex flex-col items-center gap-6">

                                <input className={style.textbox} type="text" placeholder="Enter Username" />
                                <input className={style.textbox} type="password" placeholder="Enter Password" />
                                <input className={style.btn} type="submit" value="submit" />
                            </div>


                            <div className="text-center py-4">
                                <span className="text-gray-500">Not a Member <Link className="text-red-500" to="/register">Register Now</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;