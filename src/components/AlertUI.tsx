import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface AlertConfig {
  description: string;
  variant: "filled" | "outlined" | "standard";
  severity: "error" | "info" | "success" | "warning";
}

export default function AlertUI({ description, variant, severity }: AlertConfig) {
  return (
    <Stack sx={{ width: '100%', marginBottom: '1rem' }} spacing={2}>
      <Alert 
        variant={variant} 
        severity={severity}
        sx={{
          fontWeight: '600',
          fontSize: '1rem',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
          textAlign: 'center',
          letterSpacing: '0.03em',
          // Puedes personalizar más estilos aquí
        }}
      >
        {description}
      </Alert>
    </Stack>
  );
}
