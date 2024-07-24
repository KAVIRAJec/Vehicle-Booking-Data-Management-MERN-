import { useState } from "react";

//Create Vehicle-Driver
export default function createVD() {
    const [createVDLoading, setCreateVDLoading] = useState(null);
    const [createVDMessage, setCreateVDMessage] = useState(null);
    const [createVDData, setCreateVDData] = useState(null);

    const getCreateVD = async (values) => {
        try {
            setCreateVDLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle_driver/create`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setCreateVDMessage(data.message);
                setCreateVDData(data.data);
            } else if(res.status === 400) {
                setCreateVDMessage(data.message);
            }else {
                setCreateVDMessage(data.message);
            }
        } catch (error){
            setCreateVDMessage(error);
            //console.log('error:', error);
        }finally{
            setCreateVDLoading(false);
        }
    };
        return { createVDLoading, getCreateVD, createVDMessage, createVDData };
}

export function readVehicleDriver() {
    const [loading, setLoading] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [data, setData] = useState(null);

    const readData = async (values) => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle_driver/read`, {
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

export function readAvailableVehicleDriver() {
    const [availableLoading, setAvailableLoading] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const [availableData, setAvailableData] = useState(null);

    const readAvailableData = async () => {
        try {
            setAvailableLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle_driver/readAvailable`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify()
            });

            const data = await res.json();
            if(res.status === 200) {
                setLoadingMessage(data.message);
                setAvailableData(data.data);
            } else if(res.status === 400) {
                setLoadingMessage(data.message);
            }else {
                setLoadingMessage(data.message);
            }
        } catch (error){
            setLoadingMessage(error);
        }finally{
            setAvailableLoading(false);
        }
    };
        
    return { availableLoading, readAvailableData, loadingMessage, availableData };
}