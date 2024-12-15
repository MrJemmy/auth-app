import style from "../../styles/form.module.css"


function ResetPassword() {

    return (
        <>
            <div className="container mx-auto">

                <div className="flex justify-center items-center h-screen">
                    <div className={style.glass}>
                        <div className="title flex flex-col items-center">
                            <h1 className="text-5xl font-bold">OTP</h1>
                            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                                Enter OTP to reset password
                            </span>
                        </div>

                        <form className="py-10">

                            <div className="inputbox flex flex-col items-center gap-6">
                                <span className="py-4 text-sm text-left text-gray-500">
                                    Enter 6 digit OTP sent to your email address.
                                </span>
                                <input className={style.textbox} type="text" placeholder="Enter OTP" />
                                <input className={style.btn} type="submit" value="Verify" />
                            </div>


                            <div className="text-center py-4">
                                <p className="text-gray-500">Can't get OTP? <button className="text-red-500">Resend</button></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;