import { useState } from "react";

export default function readVehicleDriver() {
    const [loading, setLoading] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [data, setData] = useState(null);

    const readData = async (values) => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3005/vehicle_driver/read', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setErrorMessage(data.message);
                setData(data.data);
            } else if(res.status === 400) {
                setErrorMessage(data.message);
            }else {
                setErrorMessage(data.message);
            }
        } catch (error){
            setErrorMessage(error);
        }finally{
            setLoading(false);
        }
    };
        return { loading, readData, errorMessage, data };
}

export function readAllVehicleDriver() {
    const [loading, setLoading] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [data, setData] = useState(null);

    const readAllData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle_driver/readAll`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify()
            });

            const data = await res.json();
            if(res.status === 200) {
                setErrorMessage(data.message);
                setData(data.data);
            } else if(res.status === 400) {
                setErrorMessage(data.message);
            }else {
                setErrorMessage(data.message);
            }
        } catch (error){
            setErrorMessage(error);
        }finally{
            setLoading(false);
        }
    };
        
    return { loading, readAllData, errorMessage, data };
}