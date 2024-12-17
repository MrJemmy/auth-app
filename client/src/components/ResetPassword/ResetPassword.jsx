import { Link } from "react-router-dom";
import style from "../../styles/form.module.css"
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { validateResetPassword } from "../../utils/validation";

function ResetPassword() {

    const formik = useFormik({
        initialValues: {
            password: "",
            conformPassword: ""
        },
        validate: validateResetPassword,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            if (values.conformPassword && values.password) {
                console.log(values);
                toast.success("Password Reset successfully!");
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
                                <input className={style.textbox} {...formik.getFieldProps('password')} type="password" placeholder="Enter Password" />
                                <input className={style.textbox} {...formik.getFieldProps('conformPassword')} type="password" placeholder="Conform Password" />
                                <input className={style.btn} type="submit" value="Reset" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;