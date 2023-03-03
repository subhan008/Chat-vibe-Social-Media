import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminPrivateRoute() {
    const token = localStorage.getItem("adminToken");
        console.log('egejfeijeiifjf',token);

    return token ? <Outlet/> : <Navigate to="/admin/login" />;
    
}

export default AdminPrivateRoute                                     
