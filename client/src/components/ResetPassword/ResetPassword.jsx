import { Link } from "react-router-dom";
import style from "../../styles/form.module.css"
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { validate } from "../../utils/validation";

function ResetPassword() {

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            if (values.username && values.password) {
                console.log(values);
                toast.success("Login successful!");
            } else {
                toast.error("Please fill out all fields correctly.");
            }
        }
    })

    return (
        <>
            <div className="container mx-auto">

                <Toaster position="top-right" reverseOrder={false}></Toaster>

                <div className="flex justify-center items-center h-screen">
                    <div className={style.glass}>
                        <div className="title flex flex-col items-center">
                            <h1 className="text-5xl font-bold">Reset Password</h1>
                            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                                Enter new password
                            </span>
                        </div>

                        <form className="py-10" onSubmit={formik.handleSubmit}>

                            <div className="inputbox flex flex-col items-center gap-6">
                                <span className="py-4 text-sm text-left text-gray-500">
                                    Enter 6 digit OTP sent to your email address.
                                </span>
                                <input className={style.textbox} {...formik.getFieldProps('username')} type="text" placeholder="Enter Username" />
                                <input className={style.btn} type="submit" value="Sign Up" />
                            </div>


                            <div className="text-center py-4">
                                <p className="text-gray-500">Not a Member <Link className="text-red-500" to="/register">Register Now</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;