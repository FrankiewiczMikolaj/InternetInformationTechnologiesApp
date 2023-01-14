import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Home(){
    var session_url = 'http://localhost:8080/management/api/v1/student';
    var uname = 'marcin';
    var pass = 'admin';

    const [students,setStudents]=useState([])
    useEffect(()=> {
        loadStudents();
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
    return(
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}