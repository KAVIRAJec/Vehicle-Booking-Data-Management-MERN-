import { useState } from "react";

export default function useBooking() {
    const [loading, setLoading] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const bookForm = async (values) => {  
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3005/booking/create', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(values)
        });
  
        const data = await res.json();
        if(res.status === 201) {
          setErrorMessage(data.message);
        } else if (res.status === 400) {
          setErrorMessage(data.message);
        }else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error);
       }finally {
        setLoading(false);
       }
    };
    
    return {loading, bookForm, errorMessage };
  }

  export function readBooking() {
    const [loading, setLoading] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [data, setData] = useState(null);
  
    const readData = async (values) => {  
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3005/booking/read', {
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
        } else if (res.status === 400) {
          setErrorMessage(data.message);
        }else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error);
       }finally {
        setLoading(false);
       }
    };
    
    return {loading, readData, errorMessage, data };
  }