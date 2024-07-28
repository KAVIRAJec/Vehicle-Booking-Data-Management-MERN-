import { useState } from "react";

//Create Driver
export default function createDriver() {
    const [createLoading, setCreateLoading] = useState(null);
    const [createMessage, setCreateMessage] = useState(null);
    const [createData, setCreateData] = useState(null);

    const getCreate = async (values) => {
        try {
            setCreateLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/driver/create`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setCreateMessage(data.message);
                setCreateData(data.data);
            } else if(res.status === 400) {
                setCreateMessage(data.message);
            }else {
                setCreateMessage(data.message);
            }
        } catch (error){
            setCreateMessage(error);
        }finally{
            setCreateLoading(false);
        }
    };
        return { createLoading, getCreate, createMessage, createData };
}

//individual Driver read
export function readDriver() {
    const [readLoading, setReadLoading] = useState(null);
    const [readMessage, setReadMessage] = useState(null);
    const [readData, setReadData] = useState(null);

    const getRead = async (values) => {
        try {
            setReadLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/driver/read`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setReadMessage(data.message);
                setReadData(data.data);
            } else if(res.status === 400) {
                setReadMessage(data.message);
            }else {
                setReadMessage(data.message);
            }
        } catch (error){
            setReadMessage(error);
        }finally{
            setReadLoading(false);
        }
    };
        return { readLoading, getRead, readMessage, readData };
}

//All Driver reading
export function readAllDriver() {
    const [readAllLoading, setReadAllLoading] = useState(null);
    const [readAllMessage, setReadAllMessage] = useState(null);
    const [readAllData, setReadAllData] = useState(null);

    const getReadAll = async (values) => {
        try {
            setReadAllLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/driver/readAll`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setReadAllMessage(data.message);
                setReadAllData(data.data);
            } else if(res.status === 400) {
                setReadAllMessage(data.message);
            }else {
                setReadAllMessage(data.message);
            }
        } catch (error){
            setReadAllMessage(error);
        }finally{
            setReadAllLoading(false);
        }
    };
        return { readAllLoading, getReadAll, readAllMessage, readAllData };
}

//Available Driver reading
export function readAvailableDriver() {
    const [readAvailableLoading, setReadAvailableLoading] = useState(null);
    const [readAvailableMessage, setReadAvailableMessage] = useState(null);
    const [readAvailableData, setReadAvailableData] = useState(null);

    const getReadAvailable = async (values) => {
        try {
            setReadAvailableLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/driver/readAll`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                const availableDrivers = data.data.drivers.filter(driver => driver.mapped === false);
                setReadAvailableMessage(data.message);
                setReadAvailableData(availableDrivers);
            } else if(res.status === 400) {
                setReadAvailableMessage(data.message);
            }else {
                setReadAvailableMessage(data.message);
            }
        } catch (error){
            setReadAvailableMessage(error);
        }finally{
            setReadAvailableLoading(false);
        }
    };
        return { readAvailableLoading, getReadAvailable, readAvailableMessage, readAvailableData };
}

//Update Driver
export function updateDriver() {
    const [updateLoading, setUpdateLoading] = useState(null);
    const [updateMessage, setUpdateMessage] = useState(null);
    const [updateData, setUpdateData] = useState(null);

    const getUpdate = async (values) => {
        try {
            setUpdateLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/driver/update`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setUpdateMessage(data.message);
                setUpdateData(data.data);
            } else if(res.status === 400) {
                setUpdateMessage(data.message);
            }else {
                setUpdateMessage(data.message);
            }
        } catch (error){
            setUpdateMessage(error);
        }finally{
            setUpdateLoading(false);
        }
    };
        return { updateLoading, getUpdate, updateMessage, updateData };
}

//Delete Driver
export function deleteDriver() {
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [deleteData, setDeleteData] = useState(null);

    const getDelete = async (values) => {
        try {
            setDeleteLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/driver/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setDeleteMessage(data.message);
                setDeleteData(data.data);
            } else if(res.status === 400) {
                setDeleteMessage(data.message);
            }else {
                setDeleteMessage(data.message);
            }
        } catch (error){
            setDeleteMessage(error);
        }finally{
            setDeleteLoading(false);
        }
    };
        return { deleteLoading, getDelete, deleteMessage, deleteData };
}