import {Navigate, Outlet} from "react-router-dom";
const PrivateRoutes = () => {
    const user = localStorage.getItem("Logged");
    let auth = {'token':false}
    if (user === "true"){
        auth.token = true;
    }
    return(
        auth.token ? <Outlet/> : <Navigate to="/Login"/>
    )
}

export default PrivateRoutes