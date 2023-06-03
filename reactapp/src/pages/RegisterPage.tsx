import { Container } from "@mui/material"

import RegisterForm from "../components/RegisterForm"

const RegisterPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "5rem" }}>
      <h2>Register page</h2>
      <RegisterForm />
    </Container>
  )
}

export default RegisterPage