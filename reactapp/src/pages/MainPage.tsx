import { useState, useEffect } from "react"
import axios from "axios"
import { Container, Grid } from "@mui/material"

import SpinnerComponent from "../components/SpinnerComponent"
import CardComponent from "../components/CardComponent"

export interface IRecipe {
	id: string,
	title: string,
	description: string,
	index: number,
	username: string,
	imageURL: string,
	recipeURL: string
}

const MainPage = () => {
	const [recipes, setRecipes] = useState<IRecipe[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		axios.get("http://localhost:5200/api/Recipes").then(response => {
			console.log(response.data)
			setLoading(false)
			setRecipes(response.data)
		}).catch(error => console.error(error))
	}, [])

	return (
		<Container maxWidth="md" style={{ marginTop: "5rem" }}>
			{
				loading ?
					<SpinnerComponent /> :
					<Grid container spacing={4}>
						{recipes.map(recipe => (
							<Grid item xs={4} key={recipe.id}>
								<CardComponent {...recipe} />
							</Grid>
						))}
					</Grid>
			}
		</Container>
	)
}

export default MainPage