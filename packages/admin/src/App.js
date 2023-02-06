import  React, { useEffect, useState } from "react";
import {  useRoutes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Loading from "./pages/auth/Loading";
import Login from "./pages/auth/Login";
import NotFound from "./pages/notfound";
import { adminRoutes } from "./routes/admin";
import { partnerRoutes } from "./routes/partner";



export default function AppRouter() {
const [routers,setRouters]=useState({})
  const [role, getRoles]=useAuth()
  let routes = useRoutes([
			{
				path: 'login',
				element: <Login />,
			},
			routers,
			{
				path: 'loading',
				element: <Loading />,
			},
			{
				path: '404',
				element: <NotFound />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		]);

 useEffect(()=>{
   getRoles()
 },[])

  useEffect(() => {
    if (role=="ADMIN"){
      setRouters(adminRoutes)
    } else if (role == "PARTNER") {
      setRouters(partnerRoutes)
    }
  }, [role])

  return routes;
}

