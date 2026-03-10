import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import LoginForm from "../components/LoginForm.jsx";

export const Login = () => {

	const { store, dispatch } = useGlobalReducer()

	const handleLogin = async () => {
		try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            console.log(data);

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
			<LoginForm onLogin={handleLogin}/>
		</div>
	);
}; 