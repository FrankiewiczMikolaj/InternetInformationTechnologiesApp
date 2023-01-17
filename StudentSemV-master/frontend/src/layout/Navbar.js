import React from 'react'
import {Link, useNavigate} from "react-router-dom"

export default function Navbar() {
    const navigate  = useNavigate();
    const OnClick = () => {
            localStorage.setItem("Logged",null);
            navigate('/Login');
    }

  return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
              <Link className="navbar-brand" to="/">Students Application</Link>
              <div className="collapse navbar-collapse" id="mynavbar">
                  <ul className="navbar-nav me-auto">
                      <li className="nav-item">
                          <Link className='btn btn-outline-light' to="/addStudent">Add Student</Link>
                      </li>
                  </ul>
                  <form className="d-flex">
                      <button className="btn btn-primary" type="button" onClick={OnClick}>Logout</button>
                  </form>
              </div>
          </div>
      </nav>
  )
}
