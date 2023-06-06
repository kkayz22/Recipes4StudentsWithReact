import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import { IRecipe } from '../pages/MainPage';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeleteRecipeModal = (recipe: IRecipe) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const response = await axios.delete(`http://localhost:5200/api/Recipes/${recipe.id}`)
    console.log(response)
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleOpen} style={{ marginLeft: "4rem", color: "red" }}>
        Delete
        <DeleteIcon />
      </Button>
      <Modal
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Delete action
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2, ml: 1 }}>
            Are you sure u want to delete it ?
          </Typography>
          <Box style={{marginTop: "0.5rem"}}>
            <Button onClick={handleDelete} style={{ color: "red" }}>Yes i want to delete it</Button>
            <Button onClick={handleClose} style={{ color: "green" }}>No</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteRecipeModal