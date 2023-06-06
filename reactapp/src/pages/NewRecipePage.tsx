import { Container } from "@mui/material"

import { useAuth } from "../hooks/useAuth"

import RecipeForm from "../components/forms/RecipeForm"
import { Navigate } from "react-router"

const NewRecipePage = () => {
	const { user } = useAuth()
	let page;

	if (user) {
		page =
			<Container maxWidth="sm" style={{ marginTop: "7rem" }} >
				<h2>Recipe page</h2>
				<RecipeForm />
			</Container>
	} else {
		return <Navigate to="/login" />
	}

	return page
}

export default NewRecipePage