import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type DataFetcherOutput } from '../functions/DataFetcher';

export default function ChartUI({loading, error, data}: DataFetcherOutput) {
    if (loading) {
        return <p>Cargando datos...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!data || !data.hourly) {
        return <p>Sin datos disponibles.</p>;
    }
    const limit = 12;
    const time = data.hourly.time.slice(0, limit);
    const temperature = data.hourly.temperature_2m.slice(0, limit);
    const windspeed = data.hourly.wind_speed_10m.slice(0, limit);
    return (
        <>
            <Typography variant="h5" component="div">
                Temperatura (2m) vs Velocidad del viento (10m)
            </Typography>
            <LineChart
                height={300}
                series={[
                { data: temperature, label: 'Temperatura (2m)'},
                { data: windspeed, label: 'Velocidad del viento (10m)'},
                ]}
                xAxis={[{ scaleType: 'point', data: time }]}
            />
        </>
   );
}