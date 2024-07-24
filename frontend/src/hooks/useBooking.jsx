import { useState } from "react";

export default function useBooking() {
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const bookForm = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/booking/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await res.json();
      if (res.status === 201) {
        setErrorMessage(data.message);
      } else if (res.status === 400) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, bookForm, errorMessage };
}

export function readBooking() {
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);

  const readData = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/booking/read`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await res.json();
      if (res.status === 200) {
        setErrorMessage(data.message);
        setData(data.data);
      } else if (res.status === 400) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, readData, errorMessage, data };
}

export function readAllBooking() {
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);

  const readData = async (values) => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/booking/readAll`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await res.json();
      if (res.status === 200) {
        setErrorMessage(data.message);
        setData(data.data);
      } else if (res.status === 400) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, readData, errorMessage, data };
}

export function updateBooking() {
  const [updateLoading, setUpdateLoading] = useState(null);
  const [updateErrorMessage, setUpdateErrorMessage] = useState(null);

  const updateData = async (values) => {
    try {
      setUpdateLoading(true);
      const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/booking/update`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await res.json();
      if (res.status === 200) {
        setUpdateErrorMessage(data.message);
      } else if (res.status === 400) {
        setUpdateErrorMessage(data.message);
      } else {
        setUpdateErrorMessage(data.message);
      }
    } catch (error) {
      setUpdateErrorMessage(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return { updateLoading, updateData, updateErrorMessage };
}