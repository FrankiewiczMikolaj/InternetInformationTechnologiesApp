import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link, useNavigate, useParams} from "react-router-dom"
 
export default function EditStudent() {
    let navigate=useNavigate()
    const [student, setStudent]=useState({
        id:"",
        name:"",
        email:"",
        dob: new Date()
    })
 
    const{name, email, dob} = student;
    const onInputChange=(e)=>{
        setStudent({...student,[e.target.name]:e.target.value})
    }
 
 
    const {id}=useParams()
    var session_url = `http://localhost:8080/management/api/v1/student/${id}`;
    var uname = 'marcin';
    var pass = 'admin';
 
 
    const onSubmit=async(e)=>{
        e.preventDefault();
         await axios.put(session_url, student,{
            auth: {
                username: uname,
                password: pass
            }
            });
        navigate("/");
    }
 
    useEffect(()=>{
        loadStudent()
    },[])
 
    const loadStudent=async()=>
    {
        const result= await axios.get(session_url,{
            auth: {
                username: uname,
                password: pass
            }
            });
        setStudent(result.data)
    }
 
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit Student</h2>
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>Name</label>
                        <input type={"text"} className="form-control" placeholder='Entery student name' name='name' value={name} onChange={(e)=>onInputChange(e)} required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Email' className='form-label'>Name</label>
                        <input type={"email"} className="form-control" placeholder='Enter student email' name='email' value={email} onChange={(e)=>onInputChange(e)} required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Dob' className='form-label'>Date of birthday</label>
                        <input type={"date"} className="form-control" placeholder='Enter student date of birthday' name='dob' value={dob} format='yyyy-MM-dd' onChange={(e)=>onInputChange(e)} required/>
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                </form>
            </div>          
        </div>
    </div>
  )
}
