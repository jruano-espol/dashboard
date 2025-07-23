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
   { field: 'id', headerName: '#', width: 70 },
   {
      field: 'label',
      headerName: 'Hora',
      width: 150,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
   },
   {
      field: 'value1',
      headerName: 'Temp. (°C)',
      width: 130,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
   },
   {
      field: 'value2',
      headerName: 'Viento (km/h)',
      width: 140,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'Resumen de datos combinados.',
      sortable: false,
      hideable: false,
      width: 220,
      valueGetter: (_, row) => `${row.label} - ${row.value1}°C, ${row.value2}km/h`,
      headerClassName: 'table-header',
      cellClassName: 'table-cell',
   },
];

export default function TableUI({ loading, error, data }: DataFetcherOutput) {
   if (loading) {
      return <p className="status-text">Cargando datos...</p>;
   }
   if (error) {
      return <p className="status-text error-text">Error: {error}</p>;
   }
   if (!data || !data.hourly) {
      return <p className="status-text">Sin datos disponibles.</p>;
   }

   const limit = 12;
   const arrLabels = data.hourly.time.slice(0, limit);
   const arrValues1 = data.hourly.temperature_2m.slice(0, limit);
   const arrValues2 = data.hourly.wind_speed_10m.slice(0, limit);

   const rows = combineArrays(arrLabels, arrValues1, arrValues2);

   return (
      <Box sx={{
         height: 400,
         width: '100%',
         backgroundColor: '#f9fafb',
         borderRadius: '12px',
         padding: '12px',
         boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      }}>
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
            className="custom-data-grid"
         />
      </Box>
   );
}
