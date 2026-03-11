import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Protected = () => {

    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="text-center">
            {store.auth ? <h1>Hola, esto es un secreto</h1> : <h1>Su presencia aqui esta prohibida</h1>}
        </div>
        
    )
}