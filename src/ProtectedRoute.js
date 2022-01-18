import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import CheckUser from "./CheckUser";
import { checkLocalUser } from "./utils/checkUser";

const ProtectedRoute = ({ children, ...rest }) => {
    const check = async () => {
        const userStatus = await checkLocalUser()
        setIsLogged(userStatus)
    }
    const [isLogged, setIsLogged] = useState(null)
    
    useEffect(()=>{
        if (isLogged === null) {
            check()
        }
    }, [])

    return (
        <Route
            {...rest}
            render={({ location }) =>
            isLogged ? (
                    children
                ) : (
                    <CheckUser />
                )}
        />
    );
};

export default ProtectedRoute;