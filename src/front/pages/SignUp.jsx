import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import SignUpForm from "../components/SignUpForm.jsx";

export const SignUp = () => {

	const { store, dispatch } = useGlobalReducer()

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

            console.log("hola")
            console.log(response)

            const data = await response.json();
            console.log(data);

		} catch (error) {
			if (error.message) throw new Error(
				error.message
			);
		}

	}

	/* useEffect(() => {
		loadMessage()
	}, []) */

	return (
		<div className="text-center mt-5">
			<SignUpForm onLogin={handleSignUp}/>
		</div>
	);
}; 