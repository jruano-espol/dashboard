import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, {type SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface SelectorUIProps {
    cityInput: string;
    setCityInput: (city: string) => void;
}

export default function SelectorUI({ cityInput, setCityInput }: SelectorUIProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
        setCityInput(event.target.value);
    };

    const capitalize1stLetter = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <Box className="selector-container">
            <FormControl fullWidth>
                <InputLabel id="city-select-label">Ciudad</InputLabel>
                <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={cityInput}
                    label="Ciudad"
                    onChange={handleChange}
                    className="selector-dropdown"
                >
                    <MenuItem disabled value="">
                        <em>Seleccione una ciudad</em>
                    </MenuItem>
                    <MenuItem value="guayaquil">Guayaquil</MenuItem>
                    <MenuItem value="quito">Quito</MenuItem>
                    <MenuItem value="manta">Manta</MenuItem>
                    <MenuItem value="cuenca">Cuenca</MenuItem>
                </Select>
            </FormControl>
            {cityInput && (
                <Typography variant="subtitle1" className="selector-result">
                    Mostrando clima en <strong>{capitalize1stLetter(cityInput)}</strong>
                </Typography>
            )}
        </Box>
    );
}