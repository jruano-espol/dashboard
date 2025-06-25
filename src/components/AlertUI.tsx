import Alert from '@mui/material/Alert';

interface AlertConfig {
    description: string;
    variant: "filled" | "outlined" | "standard";
    severity: "error" | "info" | "success" | "warning";
}

export default function AlertUI( config:AlertConfig ) {
    return (
        <Alert variant={config.variant} severity={config.severity}>
            {config.description}
        </Alert>
    )
}