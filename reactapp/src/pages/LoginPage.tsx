import { Container } from "@mui/material"

import { useAuth } from "../hooks/useAuth"

import LoginForm from "../components/forms/LoginForm"
import { Navigate } from "react-router"

const LoginPage = () => {
	const { user } = useAuth()
	let page;

	if (!user) {
		page = <Container maxWidth="sm" style={{ marginTop: "7rem" }}>
			<h2>Login page</h2>
			<LoginForm />
		</Container>
	} else {
		return <Navigate to="/" />
	}

	return page;
}

export default LoginPage