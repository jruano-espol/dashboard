import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { type DataFetcherOutput } from '../functions/DataFetcher';

export default function ChartUI({ loading, error, data }: DataFetcherOutput) {
   if (loading) return <p className="chart-status">Cargando datos...</p>;
   if (error) return <p className="chart-status">Error: {error}</p>;
   if (!data || !data.hourly) return <p className="chart-status">Sin datos disponibles.</p>;

   const limit = 12;
   const time = data.hourly.time.slice(0, limit);
   const temperature = data.hourly.temperature_2m.slice(0, limit);
   const windspeed = data.hourly.wind_speed_10m.slice(0, limit);

   return (
      <Paper elevation={3} className="chart-container">
         <Typography variant="h6" className="chart-title">
            Temperatura (2m) vs Velocidad del viento (10m)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: temperature, label: 'Temperatura (2m)', color: '#42a5f5' },
               { data: windspeed, label: 'Viento (10m)', color: '#66bb6a' },
            ]}
            xAxis={[{ scaleType: 'point', data: time }]}
            sx={{
               '.MuiLineElement-root': { strokeWidth: 3 },
               '.MuiMarkElement-root': { r: 4 },
               backgroundColor: 'transparent',
            }}
         />
      </Paper>
   );
}
