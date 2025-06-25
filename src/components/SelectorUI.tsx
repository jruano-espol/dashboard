import { useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, {type SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function SelectorUI() {
    const [cityInput, setCityInput] = useState<string>("");
   
    const handleChange = (event: SelectChangeEvent<string>) => {
        setCityInput(event.target.value);
    }

    const capitalize1stLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>
            <Select
                labelId="city-select-label"
                id="city-simple-select"
                onChange={handleChange}
                value={cityInput}
                label="Ciudad">
                <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
                <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
                <MenuItem value={"quito"}>Quito</MenuItem>
                <MenuItem value={"manta"}>Manta</MenuItem>
                <MenuItem value={"cuenca"}>Cuenca</MenuItem>
            </Select>
            {cityInput && (
                <p>
                    Información del clima en <strong>{capitalize1stLetter(cityInput)}</strong>
                </p>
            )}

        </FormControl>
    )
}