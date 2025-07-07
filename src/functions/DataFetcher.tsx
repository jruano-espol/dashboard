import { useState, useEffect } from "react";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function DataFetcher(): DataFetcherOutput {
    let [data, setData] = useState<OpenMeteoResponse|null>(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState<string|null>(null);

    useEffect(() => {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago";
        const fetchData = async () => {
            try {
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
    }, []);
    return { data, loading, error };
}