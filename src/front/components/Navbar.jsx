import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	function logout() {
		dispatch({type: 'change_auth', payload: false})
		localStorage.removeItem('token')
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{store.auth ? 
						<Link to="/">
							<button className="btn btn-primary" onClick={logout}>Logout</button>
						</Link>
					: 
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>}
				</div>
			</div>
		</nav>
	);
};