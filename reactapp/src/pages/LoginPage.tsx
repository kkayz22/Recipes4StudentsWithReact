import { Container } from "@mui/material"
import LoginForm from "../components/LoginForm"

const LoginPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "5rem" }}>
      <h2>Login page</h2>
      <LoginForm />
    </Container>
  )
}

export default LoginPage