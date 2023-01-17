import React from 'react'
import {Link,useNavigate} from "react-router-dom"

export default function NavbarForNotLoggedUsers() {
    const navigate  = useNavigate();
    const OnClick = () => {
        navigate('/Register');
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Students Application</Link>
                <button className="btn btn-primary" type="button" onClick={OnClick}>Regitser</button>
            </div>
        </nav>
    )
}
