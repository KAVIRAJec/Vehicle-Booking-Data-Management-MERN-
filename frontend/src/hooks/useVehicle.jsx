import { useState } from "react";

//Create Vehicle
export default function createVehicle() {
    const [createVLoading, setCreateVLoading] = useState(null);
    const [createVMessage, setCreateVMessage] = useState(null);
    const [createVData, setCreateVData] = useState(null);

    const getCreateV = async (values) => {
        try {
            setCreateVLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle/create`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setCreateVMessage(data.message);
                setCreateVData(data.data);
            } else if(res.status === 400) {
                setCreateVMessage(data.message);
            }else {
                setCreateVMessage(data.message);
            }
        } catch (error){
            setCreateVMessage(error);
        }finally{
            setCreateVLoading(false);
        }
    };
        return { createVLoading, getCreateV, createVMessage, createVData };
}

//individual Vehicle read
export function readVehicle() {
    const [readVLoading, setReadVLoading] = useState(null);
    const [readVMessage, setReadVMessage] = useState(null);
    const [readVData, setReadVData] = useState(null);

    const getReadV = async (values) => {
        try {
            setReadVLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle/read`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setReadVMessage(data.message);
                setReadVData(data.data);
            } else if(res.status === 400) {
                setReadVMessage(data.message);
            }else {
                setReadVMessage(data.message);
            }
        } catch (error){
            setReadVMessage(error);
        }finally{
            setReadVLoading(false);
        }
    };
        return { readVLoading, getReadV, readVMessage, readVData };
}

//All Vehicle reading
export function readAllVehicle() {
    const [readAllVLoading, setReadAllVLoading] = useState(null);
    const [readAllVMessage, setReadAllVMessage] = useState(null);
    const [readAllVData, setReadAllVData] = useState(null);

    const getReadAllV = async (values) => {
        try {
            setReadAllVLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle/readAll`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setReadAllVMessage(data.message);
                setReadAllVData(data.data);
            } else if(res.status === 400) {
                setReadAllVMessage(data.message);
            }else {
                setReadAllVMessage(data.message);
            }
        } catch (error){
            setReadAllVMessage(error);
        }finally{
            setReadAllVLoading(false);
        }
    };
        return { readAllVLoading, getReadAllV, readAllVMessage, readAllVData };
}

//Available Vehicle reading
export function readAvailableVehicle() {
    const [readAvailableVLoading, setReadAvailableVLoading] = useState(null);
    const [readAvailableVMessage, setReadAvailableVMessage] = useState(null);
    const [readAvailableVData, setReadAvailableVData] = useState(null);

    const getReadAvailableV = async (values) => {
        try {
            setReadAvailableVLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle/readAll`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                const availableVehicle = data.data.vehicles.filter(vehicle => vehicle.mapped === false);
                setReadAvailableVMessage(data.message);
                setReadAvailableVData(availableVehicle);
            } else if(res.status === 400) {
                setReadAvailableVMessage(data.message);
            }else {
                setReadAvailableVMessage(data.message);
            }
        } catch (error){
            setReadAvailableVMessage(error);
        }finally{
            setReadAvailableVLoading(false);
        }
    };
        return { readAvailableVLoading, getReadAvailableV, readAvailableVMessage, readAvailableVData };
}

//Update Vehicle
export function updateVehicle() {
    const [updateVLoading, setUpdateVLoading] = useState(null);
    const [updateVMessage, setUpdateVMessage] = useState(null);
    const [updateVData, setUpdateVData] = useState(null);

    const getUpdateV = async (values) => {
        try {
            setUpdateVLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle/update`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setUpdateVMessage(data.message);
                setUpdateVData(data.data);
            } else if(res.status === 400) {
                setUpdateVMessage(data.message);
            }else {
                setUpdateVMessage(data.message);
            }
        } catch (error){
            setUpdateVMessage(error);
        }finally{
            setUpdateVLoading(false);
        }
    };
        return { updateVLoading, getUpdateV, updateVMessage, updateVData };
}

//Delete Vehicle
export function deleteVehicle() {
    const [deleteVLoading, setDeleteVLoading] = useState(null);
    const [deleteVMessage, setDeleteVMessage] = useState(null);
    const [deleteVData, setDeleteVData] = useState(null);

    const getDeleteV = async (values) => {
        try {
            setDeleteVLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/vehicle/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setDeleteVMessage(data.message);
                setDeleteVData(data.data);
            } else if(res.status === 400) {
                setDeleteVMessage(data.message);
            }else {
                setDeleteVMessage(data.message);
            }
        } catch (error){
            setDeleteVMessage(error);
        }finally{
            setDeleteVLoading(false);
        }
    };
        return { deleteVLoading, getDeleteV, deleteVMessage, deleteVData };
}