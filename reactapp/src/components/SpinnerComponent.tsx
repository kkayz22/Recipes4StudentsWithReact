import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SpinnerComponent = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "25rem" }}>
      <CircularProgress />
    </Box>
  );
}

export default SpinnerComponent