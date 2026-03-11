import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import SignUpForm from "../components/SignUpForm.jsx";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const SignUp = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const handleSignUp = async (credentials) => {
		try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL

            console.log(backendUrl)

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok){
				const data = await response.json();
				navigate('/login')
			} else {
				throw new Error(response.status)
			}

            

		} catch (error) {
			if (error.message) throw new Error(
				error.message
			);
		}

	}


	return (
		<div className="text-center mt-5">
			{store.auth ? <Navigate to='/protected'/> : null}
			<SignUpForm onLogin={handleSignUp}/>
		</div>
	);
}; 