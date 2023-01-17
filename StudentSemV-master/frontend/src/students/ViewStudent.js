import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link, useParams} from "react-router-dom"
 
export default function ViewStudent() {
 
    const[student, setStudent] = useState({
        id:"",
        name:"",
        email:"",
        dob:"",
        age:""
    })
 
    const {id}=useParams()
    var session_url = `http://localhost:8080/management/api/v1/student/${id}`;
    var uname = 'marcin';
    var pass = 'admin';
 
    useEffect(()=> {
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
                <h2 className='text-center m-4'>Student Details</h2>
                <div className='card'>
                    <div className='card-header'>
                        <h5 className='card-title'>Details of student id:{student.id}</h5>
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Name: </b>
                                {student.name}
                            </li>
                            <li className='list-group-item'>
                                <b>Email: </b>
                                {student.email}
                            </li>
                            <li className='list-group-item'>
                                <b>Date of birthday: </b>
                                {student.dob}
                            </li>
                            <li className='list-group-item'>
                                <b>Age: </b>
                                {student.age}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
            </div>
        </div>
    </div>
  )
}
