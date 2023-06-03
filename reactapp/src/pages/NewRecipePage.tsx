import { Container } from "@mui/material"
import RecipeForm from "../components/RecipeForm"

const NewRecipePage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "5rem" }}>
      <h2>Recipe page</h2>
      <RecipeForm />
    </Container>
  )
}

export default NewRecipePage