import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddStudent from './students/AddStudent';
import EditStudent from './students/EditStudent';
import ViewStudent from './students/ViewStudent';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route exact path="/Home" element={<Home/>}/>
                    <Route exact path="/addStudent" element={<AddStudent/>}/>
                    <Route exact path="/editStudent/:id" element={<EditStudent/>}/>
                    <Route exact path="/viewStudent/:id" element={<ViewStudent/>}/>
                    <Route exact path="/" element={<Home/>}/>
                </Route>
                <Route exact path="/Login" element={<Login/>}/>
                <Route exact path="/Register" element={<Register/>}/>
            </Routes>          
        </Router>
    </div>
  );
}

export default App;
