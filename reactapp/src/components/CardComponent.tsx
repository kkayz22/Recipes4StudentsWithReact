import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { IRecipe } from '../pages/MainPage';

const CardComponent = (recipe: IRecipe) => {
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
                <IconButton aria-label="Follow link" href={recipe.recipeURL}>
                    Recipe page
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CardComponent