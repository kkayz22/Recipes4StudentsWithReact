import { Container } from "@mui/material"

import { useAuth } from "../hooks/useAuth"

import RecipeForm from "../components/RecipeForm"
import { useNavigate } from "react-router"

const NewRecipePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  let page;

  if (user) {
    page = 
    <Container maxWidth="sm" style={{ marginTop: "5rem" }} >
      <h2>Recipe page</h2>
      <RecipeForm />
    </Container >
  } else {
    navigate("/login")
  }

  return page
}

export default NewRecipePage