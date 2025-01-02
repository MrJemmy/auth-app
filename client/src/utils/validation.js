import toast from "react-hot-toast";

export async function validate(values) {
    let error = {}
    error = usernameVerify(error, values)
    error = passwordVerify({}, values)

    return error;
}


export async function validateResetPassword(values) {
    let error = {}
    if(values.password !== values.conformPassword){
        error.match = toast.error("Password not match...!")
    }

    error = passwordVerify(error, values)

    return error;
}


export async function validateRegistraion(values) {
    let error = {}
    error = usernameVerify(error, values)
    error = emailVerify(error, values)
    error = passwordVerify(error, values)

    return error;
}


export async function validateProfile(values) {
    let error = {}
    error = emailVerify(error, values)

    return error;
}




/** validate username **/
function usernameVerify(error={}, values){
    if(!values.username){
        error.username = toast.error("Username Required...!");
    }else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username...!")
    }

    return error
}


function emailVerify(error={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Invalid Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }


    return error
}


function passwordVerify(error={}, values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password){
        error.password = toast.error("Password Required...!");
    }else if(values.password.includes(" ")){
        error.password = toast.error("Invalid Password...!")
    }else if(values.password.length < 4){
        error.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        error.password = toast.error("Password must have special character");
    }

    return error
}


