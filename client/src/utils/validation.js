export async function validate(values) {
    let error = {}
    error = usernameVerify(error, values)
    error = passwordVerify({}, values)

    return error;
}


export async function validateResetPassword(values) {
    let error = {}
    if(values.password !== values.conformPassword){
        error.match = "Password not match...!"
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
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    if(!values.username){
        error.username = "Username Required...!"
    }else if(values.username.includes(" ")){
        error.username = "Invalid Username...!"
    }

    return error
}


function emailVerify(error={}, values){
    if(!values.email){
        error.email = "Email Required...!"
    }else if(values.email.includes(" ")){
        error.email = "Invalid Email...!"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = "Invalid email address...!"
    }


    return error
}


function passwordVerify(error={}, values){
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password){
        error.password = "Password Required...!"
    }else if(values.password.includes(" ")){
        error.password = "Invalid Password...!"
    }else if(values.password.length < 4){
        error.password = "Password must be more than 4 characters long"
    }else if(!specialChars.test(values.password)){
        error.password = "Password must have special character"
    }

    return error
}


