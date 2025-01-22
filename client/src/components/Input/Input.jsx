import style from "../../styles/form.module.css"

function Input({type, placeholder}) {

    return (
        <>
            <input  className={style.textbox} type={type} placeholder={placeholder} />
        </>
    )
}

export default Input;