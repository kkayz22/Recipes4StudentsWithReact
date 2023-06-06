import { useState } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';

interface IRegister {
	email: string,
	index: number,
	password: string,
	username: string,
	field: string
}

const RegisterForm = () => {
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const initialValues = {
		email: '',
		password: '',
		index: 0,
		username: '',
		field: ''
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.min(8, "Atleast 8 characters"),
		index: Yup.number()
			.required("Index is required"),
		username: Yup.string()
			.required("Name is required"),
		field: Yup.string()
			.required("Field is required")
	});

	const onSubmit = async (values: IRegister) => {
		// Handle form submission here
		try {
			setLoading(true)
			console.log(values);
			await axios.post("http://localhost:5200/Auth/register", values)
			navigate("/login")
			setLoading(false)
		} catch (err: any) {
			setLoading(true)
			setError(err.response.data)
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

			<TextField
				style={{ marginTop: "0.7rem" }}
				fullWidth
				id="index"
				name="index"
				label="Index"
				value={formik.values.index}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.index && Boolean(formik.errors.index)}
				helperText={formik.touched.index && formik.errors.index}
			/>

			<TextField
				style={{ marginTop: "0.7rem" }}
				fullWidth
				id="username"
				name="username"
				label="Username"
				value={formik.values.username}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.username && Boolean(formik.errors.username)}
				helperText={formik.touched.username && formik.errors.username}
			/>

			<TextField
				style={{ marginTop: "0.7rem" }}
				fullWidth
				id="field"
				name="field"
				label="Field"
				value={formik.values.field}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.field && Boolean(formik.errors.field)}
				helperText={formik.touched.field && formik.errors.field}
			/>

			<Button type="submit" variant="contained" color="primary" style={{ marginTop: "0.7rem" }}>
				{loading ? <CircularProgress style={{ width: "1.5rem", height: "1.5rem", color: "white" }} /> : "Register"}
			</Button>
			{error ?
				<Alert variant="outlined" severity="error" style={{ marginTop: "0.5rem" }}>
					{error}
				</Alert> : ""}
		</form>
	)
}

export default RegisterForm