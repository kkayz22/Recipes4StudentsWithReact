import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
	const { user, logout } = useAuth()
	return (
		<Box>
			<AppBar position="absolute" sx={{ bgcolor: "black" }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to="/" style={{ textDecoration: "none", color: "white" }}>Home</Link>
					</Typography>
					<Button color="inherit">
						<Link to="/addRecipe" style={{ textDecoration: "none", color: "white" }}>Add a recipe</Link>
					</Button>
					{user ?
						<Button color="inherit" onClick={logout}>Logout</Button> :
						<>
							<Button color="inherit"><Link to="/login" style={{ textDecoration: "none", color: "white" }}>Login</Link></Button>
							<Button color="inherit"><Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register</Link></Button>
						</>
					}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar