import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom"
import Navbar from '../layout/Navbar';

export default function Home() {
    var session_url = 'http://localhost:8080/management/api/v1/student';
    var uname = 'marcin';
    var pass = 'admin';
 
    const[students, setStudents] = useState([])
    useEffect(()=> {
        loadStudents()
    },[])
 
    const loadStudents=async()=>{
        const result= await axios.get(session_url, {
            auth: {
                username: uname,
                password: pass
            }
            });
        setStudents(result.data);
    }

    const{id}=useParams
    const deleteUser=async(id)=>{
        await axios.delete(`${session_url}/${id}`, {
            auth: {
                username: uname,
                password: pass
            }
            });
        loadStudents()
    }
  return (
      <div>
          <Navbar/>
          <div className='container'>
              <div className='py-4'>
                  <table className="table border shadow">
                      <thead>
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">email</th>
                          <th scope="col">Data of birthday</th>
                          <th scope="col">Age</th>
                          <th scope="col">Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                          students.map((student, index)=> (
                              <tr key={index}>
                                  <th scope="row" >
                                      {index+1}
                                  </th>
                                  <td>{student.name}</td>
                                  <td>{student.email}</td>
                                  <td>{new Date(student.dob).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                  <td>{student.age}</td>
                                  <td>
                                      <Link className='btn btn-primary mx-2' to={`/viewstudent/${student.id}`}>View</Link>
                                      <Link className='btn btn-outline-primary mx-2' to={`/editstudent/${student.id}`}>Edit</Link>
                                      <button className='btn btn-danger mx-2' onClick={()=>deleteUser(student.id)}>Delete</button>
                                  </td>
                              </tr>
                          ))
                      }
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  )
}
