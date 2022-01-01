/* Nachiket Panchal */
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navigation() {
    const navigate = useNavigate();
    return (
        <header className="navbar">
            <div className="w-100">
                <button className="btn btn-primary float-right" onClick={() => {
                    localStorage.clear();
                    navigate("/");
                }}>Logout</button>
            </div>
        </header>
    );
}

export default Navigation;
