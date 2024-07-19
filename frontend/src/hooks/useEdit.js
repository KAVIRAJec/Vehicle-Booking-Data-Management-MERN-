import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx"; 

const useEdit = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const editUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${VITE_APP_BACKEND_URL}/api/auth/edit`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await res.json();
      if(res.status === 200) {
        setErrorMessage(data.message);
        //login(data.token,data.user);
      } else if (res.status === 400) {
        setErrorMessage(data.message);
      }else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error);
     }finally {
      setLoading(false);
      console.log("error ",errorMessage);
     }
  };
  
  return {loading, error, editUser, errorMessage };
}

export default useEdit