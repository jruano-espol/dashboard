import { useState, useEffect } from "react";
import { type OpenMeteoResponse } from "../types/DashboardTypes";

export interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

interface CachedItem {
    data: OpenMeteoResponse;
    timestamp: number;
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

    const UPDATE_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

    function getCachedItem(ciudad: string): CachedItem | null {
        let str = localStorage.getItem(ciudad);
        return str ? JSON.parse(str) : null;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!ciudades[ciudad]) {
                    throw new Error(`La ciudad "${ciudad}" es inválida. Debe ser una de las siguientes: ${Object.keys(ciudades).join(", ")}`);
                }
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${ciudades[ciudad].lat}&longitude=${ciudades[ciudad].lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago`;
                const now = Date.now();
                
                let cached_response = getCachedItem(ciudad);
                if (!cached_response || now > cached_response.timestamp + UPDATE_TIMEOUT_MS) {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    const item = { data: data, timestamp: now };
                    localStorage.setItem(ciudad, JSON.stringify(item));
                    cached_response = item;
                }
                setData(cached_response.data);
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