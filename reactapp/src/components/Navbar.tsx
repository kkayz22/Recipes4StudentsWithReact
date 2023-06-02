import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<Box>
			<AppBar position="absolute" color='default'>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link>
					</Typography>
					<Button color="inherit"><Link to="/addRecipe" style={{ textDecoration: "none", color: "black" }}>Add a recipe</Link></Button>
					<Button color="inherit"><Link to="/login" style={{ textDecoration: "none", color: "black" }}>Login</Link></Button>
					<Button color="inherit"><Link to="/register" style={{ textDecoration: "none", color: "black" }}>Register</Link></Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar