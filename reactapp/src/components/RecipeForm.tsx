import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

interface IRecipeForm {
	title: string,
	description: string,
	index: number,
	username: string,
	imageURL: string,
	recipeURL: string
}

const RecipeForm = () => {
	const navigate = useNavigate()

	const initialValues = {
		title: '',
		description: '',
		index: 0,
		username: '',
		imageURL: '',
        recipeURL: ''
	};

	const validationSchema = Yup.object({
		title: Yup.string()
			.required('Title is required')
            .min(10, "Minimum 10 characters"),
		description: Yup.string()
			.required('Description is required')
			.min(20, "Atleast 20 characters"),
		imageURL: Yup.string()
			.required("ImageURL is required")
            .trim().matches(/([a-z\-_0-9]*\.(jpg|jpeg|png|gif))/i, "Needs to have a valid image url :("),
        recipeURL: Yup.string()
			.required("RecipeURL is required")
            .trim().matches(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/g, "Needs to be a valid url"),
	});

	const onSubmit = (values: IRecipeForm) => {
		// Handle form submission here
		console.log(values);
		navigate("/")
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
				id="title"
				name="title"
				label="Title"
				value={formik.values.title}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.title && Boolean(formik.errors.title)}
				helperText={formik.touched.title && formik.errors.title}
			/>

			<TextField
				style={{ marginTop: "0.5rem" }}
				fullWidth
				id="description"
				name="description"
				label="Description"
				value={formik.values.description}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.description && Boolean(formik.errors.description)}
				helperText={formik.touched.description && formik.errors.description}
			/>
        
			<TextField
				style={{ marginTop: "0.5rem" }}
				fullWidth
				id="imageURL"
				name="imageURL"
				label="imageURL"
				value={formik.values.imageURL}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.imageURL && Boolean(formik.errors.imageURL)}
				helperText={formik.touched.imageURL && formik.errors.imageURL}
			/>

            <TextField
				style={{ marginTop: "0.5rem" }}
				fullWidth
				id="recipeURL"
				name="recipeURL"
				label="recipeURL"
				value={formik.values.recipeURL}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.recipeURL && Boolean(formik.errors.recipeURL)}
				helperText={formik.touched.recipeURL && formik.errors.recipeURL}
			/>

			<Button type="submit" variant="contained" color="primary" style={{ marginTop: "0.5rem" }}>
                Add a recipe
			</Button>
		</form>
	)
}

export default RecipeForm