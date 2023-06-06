import { Container } from "@mui/material"
import { Navigate } from "react-router"

import { useAuth } from "../hooks/useAuth"

import RegisterForm from "../components/forms/RegisterForm"

const RegisterPage = () => {
	const { user } = useAuth()
	let page;

	if (!user) {
		page = <Container maxWidth="sm" style={{ marginTop: "7rem" }}>
			<h2>Register page</h2>
			<RegisterForm />
		</Container>
	} else {
		return <Navigate to="/" />
	}

	return page;
}

export default RegisterPage