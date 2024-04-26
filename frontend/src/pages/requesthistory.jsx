import React from 'react'
import { readBooking } from '@/hooks/useBooking'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Requesthistory = () => {
  const { loading,readData, errorMessage } = readBooking();
  const { userData } = useAuth();

  const handlesubmit = (values) => {
    readData(userData.email);
    console.log(errorMessage);
  }

  return (
    <div>
      req history 
      <Button onClick={handlesubmit}>CLICK</Button>
    </div>
  )
}

export default Requesthistory
