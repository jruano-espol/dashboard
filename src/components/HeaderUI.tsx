import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function HeaderUI() {
    return (
        <Box className="header-container">
            <Typography variant="h2" component="h1" className="header-title">
                Dashboard del Clima
            </Typography>
        </Box>
    );
}