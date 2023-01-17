import React, {useState} from "react";
import "./login.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
export default function Register(){
    const navigate  = useNavigate();
    const [formData, setFormData] = useState({login: "", email: "", password1: "", password2: ""})
    const formPreventDefault = (e) => {
        e.preventDefault();
    }
    const onChangeLogin = (e) => {
        setFormData({...formData, login: e.target.value})
    }

    const onChangeEmail = (e) => {
        setFormData({...formData, email: e.target.value})
    }

    const onChangePassword1 = (e) => {
        setFormData({...formData, password1: e.target.value})
    }
    const onChangePassword2 = (e) => {
        setFormData({...formData, password2: e.target.value})
    }
    const OnClick = () => {
        if(!(formData.password1 === formData.password2)){
            alert("The passwords are different. Please enter the correct passwords.");
        }
        checkUser();

    }
    const username=formData.login;
    var uname = 'marcin';
    var pass = 'admin';

    const checkUser=async()=> {
        var session_url = `http://localhost:8080/management/api/v1/user/username/${username}`;
        try {
            const result= await axios.get(session_url,{
                auth: {
                    username: uname,
                    password: pass
                }
            });
            console.log(result.request);
            handleClick(result.status, result.data);

        } catch(error) {
            if (error.response.status === 500) {
                console.log(error.response.data);
                handleClick(500,error.response.data);
            }
        }
    }

    const handleClick = (status,jsonString) => {
        console.log(jsonString.message);
        if(status === 200) {
           alert("This user already exists. Enter other details.")
        }else if (status === 500 && jsonString.message === 'User with username '+username+' does not exists'){
            var user = {"username":formData.login,"password":formData.password1,"email":formData.email};
            addUser(user);
        } else {
            alert("The server encountered an error. Report to the administrator.");
        }
    }

    const addUser=async(user)=> {
        var session_url = `http://localhost:8080/management/api/v1/user`;
        await axios.post(session_url, user,{
            auth: {
                username: uname,
                password: pass
            }
        });
        alert("Użytkownik został dodany możesz się zalogować.")
        navigate("/");
    }
    return (
        <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Students Application</Link>
            </div>
        </nav>
        <div className="login-form">
            <form onSubmit={formPreventDefault}>
                <h2 className="text-center">Register</h2>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" required="required" value={formData.login} onChange={onChangeLogin}/>
                </div><br></br>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email" required="required" value={formData.email} onChange={onChangeEmail}/>
                </div><br></br>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" required="required" value={formData.password1} onChange={onChangePassword1}/>
                </div><br></br>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" required="required" value={formData.password2} onChange={onChangePassword2}/>
                </div><br></br>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" onClick={OnClick}>Register</button>
                </div>
            </form>
        </div>
    </div>
    )
}
