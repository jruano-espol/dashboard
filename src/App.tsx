import { Grid } from '@mui/material';
import { useState } from 'react';
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {
  let [city, setCity] = useState<string>('guayaquil');
  let dataFetcherOutput = DataFetcher(city);
  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">
      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        <HeaderUI />
      </Grid>
      
      {/* Alertas */}
      <Grid size={{ xs: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI 
          description="No se preveen lluvias"
          variant="filled"
          severity="info"
        />
      </Grid>
      
      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI cityInput={city} setCityInput={setCity}/>
      </Grid>
      
      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
        {dataFetcherOutput.loading && <p>Cargando datos...</p>}
        {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
        {dataFetcherOutput.data && 
          <>
            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI title='Temperatura (2m)'
                description={
                  dataFetcherOutput.data.current.temperature_2m + " " +
                  dataFetcherOutput.data.current_units.temperature_2m}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI title='Temperatura aparente'
                description={
                  dataFetcherOutput.data.current.apparent_temperature + " " +
                  dataFetcherOutput.data.current_units.apparent_temperature}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI title='Velocidad del viento'
                description={
                  dataFetcherOutput.data.current.wind_speed_10m + " " +
                  dataFetcherOutput.data.current_units.wind_speed_10m}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI title='Humedad relativa'
                description={
                  dataFetcherOutput.data.current.relative_humidity_2m + " " +
                  dataFetcherOutput.data.current_units.relative_humidity_2m}
              />
            </Grid>
          </>
        }
      </Grid>
      
      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block"} }}>
        <ChartUI
          loading={dataFetcherOutput.loading}
          data={dataFetcherOutput.data}
          error={dataFetcherOutput.error}/>
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block"} }}>
        <TableUI
          loading={dataFetcherOutput.loading}
          data={dataFetcherOutput.data}
          error={dataFetcherOutput.error}/>
      </Grid>
      
      {/* Información adicional */}
      <Grid size={{ xs: 6, md: 6 }}>
        <div style={{
          background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(33, 150, 243, 0.08)',
          marginTop: '16px',
          textAlign: 'center',
        }}>
          <h2 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>
            Información adicional del clima
          </h2>
          <p style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>
            Consulta el pronóstico actualizado para tu ciudad.<br />
            Los datos incluyen temperatura, humedad, viento y más.<br />
            Recuerda que las condiciones pueden cambiar rápidamente.
          </p>
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
