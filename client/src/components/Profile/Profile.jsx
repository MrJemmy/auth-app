import { Link } from "react-router-dom";
import avatar from "../../assets/images/profile.png"
import style from "../../styles/form.module.css"
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { validateProfile } from "../../utils/validation";
import { useState } from "react";
import convertToBase64 from "../../utils/convert";

function Register() {

    const [file, setFile] = useState();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            address: "",
        },
        validate: validateProfile,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = Object.assign(values, {profile: file || ""})

            if (values.firstName || values.lastName || values.email || values.mobile || values.address) {
                toast.success("Profile updated successful!");
            } else {
                toast.error("Please fill atleast one field");
            }
        }
    })

    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }

    return (
        <>
            <div className="container mx-auto">

            <Toaster position="top-right" reverseOrder={false}></Toaster>

                <div className="flex justify-center items-center h-screen">
                    <div className={style.glass}>
                        <div className="title flex flex-col items-center">
                            <h1 className="text-5xl font-bold">Register</h1>
                            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                                You can update your details.
                            </span>
                        </div>

                        <form className="py-1" onSubmit={formik.handleSubmit}>
                            <div className="profile flex justify-center py-5">
                                <label htmlFor="profile">
                                    <img className={style.profile_img} src={file || avatar} alt="avtar" />
                                </label>
                                <input type="file" name="profile" id="profile" onChange={onUpload}/>
                                
                            </div>

                            <div className="inputbox flex flex-col items-center gap-6">
                                <div className="name flex w-3/4 gap-10">
                                    <input className={style.textbox} {...formik.getFieldProps('firstName')} type="text" placeholder="FirstName" />
                                    <input className={style.textbox} {...formik.getFieldProps('lastName')} type="text" placeholder="LirstName" />
                                </div>

                                <div className="name flex w-3/4 gap-10">
                                    <input className={style.textbox} {...formik.getFieldProps('email')} type="text" placeholder="Email" />
                                    <input className={style.textbox} {...formik.getFieldProps('mobile')} type="text" placeholder="Mobile" />
                                </div>

                                <input className={style.textbox} {...formik.getFieldProps('address')} type="text" placeholder="Address" />

                                <input className={style.btn} type="submit" value="Update" />
                            </div>


                            <div className="text-center py-4">
                                <p className="text-gray-500">come back later? <Link className="text-red-500" to="/login">Logout</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;