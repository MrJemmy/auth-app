import { Link } from "react-router-dom";
import avatar from "../../assets/images/profile.png"
import style from "../../styles/form.module.css"
import { useFormik } from "formik";
import { validate } from "../../utils/validation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {  } from "@fortawesome/free-solid-svg-icons"

function Login() {

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {

            const result = validate()
            console.log(formik.errors)
            if (values.username && values.password) {
                console.log(values);
                console.log("Login successful!");
            } else {
                console.log("Please fill out all fields correctly.");
            }
        }
    })

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

                        <form className="py-1" onSubmit={formik.handleSubmit}>
                            <div className="profile flex justify-center py-5">
                                <img className={style.profile_img} src={avatar} alt="avtar" />
                            </div>

                            <div className="inputbox flex flex-col items-center gap-6">

                                <input className={`${style.textbox} ${formik.errors.username?style.invalid_textbox:style.valid_textbox}`} {...formik.getFieldProps('username')} type="text" placeholder="Enter Username" />
                                <input className={`${style.textbox} ${formik.errors.username?style.invalid_textbox:style.valid_textbox}`} {...formik.getFieldProps('password')} type="password" placeholder="Enter Password" />
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