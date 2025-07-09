import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type DataFetcherOutput } from '../functions/DataFetcher';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Tiempo',
      width: 150,
   },
   {
      field: 'value1',
      headerName: 'Temperatura (2m)',
      width: 150,
   },
   {
      field: 'value2',
      headerName: 'Velocidad del viento (10m)',
      width: 150,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 160,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
];

export default function TableUI({loading, error, data}: DataFetcherOutput) {
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
   const arrLabels = data.hourly.time.slice(0, limit);
   const arrValues1 = data.hourly.temperature_2m.slice(0, limit);
   const arrValues2 = data.hourly.wind_speed_10m.slice(0, limit);

   const rows = combineArrays(arrLabels, arrValues1, arrValues2);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}