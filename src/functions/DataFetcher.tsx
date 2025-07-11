import { useState, useEffect } from "react";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

export interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const ciudades: Record<string, { lat: number, lon: number }> = {
  guayaquil: {lat: -2.170997,lon: -79.922359},
  quito: {lat: -0.180653, lon: -78.467838},
  manta: {lat: -0.957035, lon: -80.738105},
  cuenca: {lat: -2.900624, lon: -79.004775}
};

export default function DataFetcher(ciudad: string): DataFetcherOutput {
    let [data, setData] = useState<OpenMeteoResponse|null>(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState<string|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!ciudades[ciudad]) {
                    throw new Error(`La ciudad "${ciudad}" es inválida. Debe ser una de las siguientes: ${Object.keys(ciudades).join(", ")}`);
                }
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudades[ciudad].lat}&longitude=${ciudades[ciudad].lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setData(await response.json());
            } catch (error: Error | unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Error desconocido al obtener los datos");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ciudad]);
    return { data, loading, error };
}