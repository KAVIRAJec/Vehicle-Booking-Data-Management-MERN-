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

export function editDVehicleDriver() {
    const [editDLoading, setEditDLoading] = useState(null);
    const [editDMessage, setEditDMessage] = useState(null);
    const [editDData, setEditDData] = useState(null);

    const editD = async (values) => {
        try {
            setEditDLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle_driver/updateDriver`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setEditDMessage(data.message);
                setEditDData(data.data);
            } else if(res.status === 400) {
                setEditDMessage(data.message);
            }else {
                setEditDMessage(data.message);
            }
        } catch (error){
            setEditDMessage(error);
        }finally{
            setEditDLoading(false);
        }
    };
        
    return { editDLoading, editD, editDMessage, editDData };
}

export function editVVehicleDriver() {
    const [editVLoading, setEditVLoading] = useState(null);
    const [editVMessage, setEditVMessage] = useState(null);
    const [editVData, setEditVData] = useState(null);

    const editV = async (values) => {
        try {
            setEditVLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle_driver/updateVehicle`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setEditVMessage(data.message);
                setEditVData(data.data);
            } else if(res.status === 400) {
                setEditVMessage(data.message);
            }else {
                setEditVMessage(data.message);
            }
        } catch (error){
            setEditVMessage(error);
        }finally{
            setEditVLoading(false);
        }
    };
        
    return { editVLoading, editV, editVMessage, editVData };
}

export function deleteVehicleDriver() {
    const [deleteVDLoading, setDeleteVDLoading] = useState(null);
    const [deleteVDMessage, setDeleteVDMessage] = useState(null);
    const [deleteVDData, setDeleteVDData] = useState(null);

    const getDeleteVD = async (values) => {
        try {
            setDeleteVDLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle_driver/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setDeleteVDMessage(data.message);
                setDeleteVDData(data.data);
            } else if(res.status === 400) {
                setDeleteVDMessage(data.message);
            }else {
                setDeleteVDMessage(data.message);
            }
        } catch (error){
            setDeleteVDMessage(error);
        }finally{
            setDeleteVDLoading(false);
        }
    };
        
    return { deleteVDLoading, getDeleteVD, deleteVDMessage, deleteVDData };
}