import toast from "react-hot-toast";

export async function validate(values) {
    let error = {}
    error = usernameVerify({}, values)
    error = {...error, ...passwordVerify({}, values)}

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


