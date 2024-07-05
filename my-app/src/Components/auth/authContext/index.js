import React from "react";

export const initState = {
    isAuth: false,
    user: null
}

export const AuthContext = React.createContext({
    ...initState,
    login: (user) => {},
    logout : () => {}
});