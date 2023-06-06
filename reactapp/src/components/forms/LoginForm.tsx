import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Alert, CircularProgress } from '@mui/material';
import { useState } from "react"
import { useNavigate } from 'react-router';

import { useAuth } from '../../hooks/useAuth';

export interface ILogin {
	email: string,
	password: string
}

const LoginForm = () => {
	const { login } = useAuth()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.required('Password is required'),
	});

	const onSubmit = async (values: ILogin) => {
		// Handle form submission here
		try {
			setLoading(true)
			console.log(values)
			await login(values)
			navigate("/")
			setLoading(false)
		} catch (error: any) {
			setLoading(true)
			setError(error.response.data)
			setLoading(false)
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<TextField
				fullWidth
				id="email"
				name="email"
				label="Email"
				value={formik.values.email}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={formik.touched.email && formik.errors.email}
			/>

			<TextField
				style={{ marginTop: "0.7rem" }}
				fullWidth
				id="password"
				name="password"
				label="Password"
				type="password"
				value={formik.values.password}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.password && Boolean(formik.errors.password)}
				helperText={formik.touched.password && formik.errors.password}
			/>

			<Button type="submit" variant="contained" color="primary" style={{ marginTop: "0.7rem" }}>
				{loading ? <CircularProgress style={{ width: "1.5rem", height: "1.5rem", color: "white" }} /> : "Login"}
			</Button>
			{error ? <Alert variant="outlined" severity="error" style={{ marginTop: "0.5rem" }}>
				{error}
			</Alert> : ""}
		</form>
	)
}

export default LoginForm