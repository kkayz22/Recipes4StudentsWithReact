import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { IRecipe } from '../pages/MainPage';
import { useAuth } from '../hooks/useAuth';
import DeleteRecipeModal from './DeleteRecipeModal';

const CardComponent = (recipe: IRecipe) => {
	const { user } = useAuth()

	return (
		<Card sx={{ maxWidth: 450 }}>
			<CardHeader
				title={recipe.title}
				subheader={`Added by ${recipe.username}, ${recipe.index}`}
			/>
			<CardMedia
				component="img"
				height="180"
				image={recipe.imageURL}
				alt={recipe.title}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{recipe.description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Button aria-label="Follow link" href={recipe.recipeURL} style={{ color: "black", marginLeft: "0.3rem" }}>
					Recipe
					<ExitToAppIcon style={{ marginLeft: "0.2rem" }}/>
				</Button>
				{user && user.user.username === recipe.username ?
					<DeleteRecipeModal {...recipe} />
				 : ""}
			</CardActions>
		</Card>
	)
}

export default CardComponent