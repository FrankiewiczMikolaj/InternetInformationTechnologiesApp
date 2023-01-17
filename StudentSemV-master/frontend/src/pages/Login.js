import React, {useState} from "react";
import "./login.css";
import NavbarNavbarForNotLoggedUsers from '../layout/NavbarForNotLoggedUsers';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
export default function Login(){
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({login: "", password: ""})
    const OnClick = () => {
            loadUser();
    }

    const handleClick = (status,jsonString) => {
        if(status === 200) {
            if (formData.login === jsonString.username && formData.password === jsonString.password){
                localStorage.setItem("Logged","true");
                navigate('/Home');
            }else{
                alert("No such user found. Check your login details.")
            }
        }else if (status === 500){
            alert("No such user found. Check your login details.")
        } else {
            alert("The server encountered an error. Report to the administrator.");
        }
    }

    const onChangeLogin = (e) => {
        setFormData({...formData, login: e.target.value})
    }

    const onChangePassword = (e) => {
        setFormData({...formData, password: e.target.value})
    }
    const formPreventDefault = (e) => {
        e.preventDefault();

    }
    const username=formData.login;
    var session_url = `http://localhost:8080/management/api/v1/user/username/${username}`;
    var uname = 'marcin';
    var pass = 'admin';

    const loadUser=async()=> {
        try {
            const result= await axios.get(session_url,{
                auth: {
                    username: uname,
                    password: pass
                }
            });
            console.log(result.status);
            handleClick(result.status, result.data);

        } catch(error) {
            if (error.response.status === 500) {
                handleClick(500);
            } else {
                handleClick(500);
            }
        }
    }

    return (
            <div>
                <NavbarNavbarForNotLoggedUsers/>
                <div className="login-form">
                    <form onSubmit={formPreventDefault}>
                        <h2 className="text-center">Log in</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" required="required" value={formData.login} onChange={onChangeLogin}/>
                        </div><br></br>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required="required" value={formData.password} onChange={onChangePassword}/>
                        </div><br></br>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" onClick={OnClick}>Log in</button>
                        </div>
                    </form>
                </div>
            </div>



    )
}

