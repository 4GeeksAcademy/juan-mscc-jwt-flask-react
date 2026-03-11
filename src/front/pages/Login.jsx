import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import LoginForm from "../components/LoginForm.jsx";
import { Navigate } from "react-router-dom";

export const Login = () => {

	const { store, dispatch } = useGlobalReducer()

	const handleLogin = async (credentials) => {
		try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

			if (response.ok) {
				const data = await response.json();
            	dispatch({type: 'change_auth', payload: true})
				localStorage.setItem("token", data.access_token)
			} else {
				throw new Error(response.status)
			}

            /* const data = await response.json();
            console.log(data)
			localStorage.setItem("token", data.access_token) */
		} catch (error) {
			if (error.message) throw new Error(
				`Login was not possible`
			);
		}

	}

	/* useEffect(() => {
		loadMessage()
	}, []) */

	return (
		<div className="text-center mt-5">
			{store.auth == true ? <Navigate to='/protected'/> : ''}
			<LoginForm onLogin={handleLogin}/>
		</div>
	);
}; 