import { Link } from "react-router-dom";
import style from "../../styles/form.module.css"

function Home() {
    return (
        <>
            <h1 className="text-center">Home Page</h1>
            <div className="flex justify-center items-center">
                <Link className={style.btn} to="/profile">User Profile</Link>
            </div>
        </>
    )
}

export default Home;