import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster, toast } from 'sonner'
import { ClassicSpinner } from 'react-spinners-kit';

import { readAvailableDriver } from '../hooks/useDriver';
import { readAvailableVehicle } from '../hooks/useVehicle';
import createVD from '../hooks/useVehicleDriver';

const initialValues = {
  vehicle_unique_no: "",
  driver_name: "",
};

const CreateVehicleDriverPage = () => {

  const { readAvailableLoading, getReadAvailable, readAvailableMessage, readAvailableData } = readAvailableDriver();
  const { readAvailableVLoading, getReadAvailableV, readAvailableVMessage, readAvailableVData } = readAvailableVehicle();

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getReadAvailable();
      await getReadAvailableV();
    };
    fetchData();
  }, []);

  const handleChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleBooking(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.vehicle_unique_no) {
      errors.vehicle_unique_no = 'Vehicle Number is required';
    }
    if (!values.driver_name) {
      errors.driver_name = 'Driver Name is required';
    }
    return errors;
  };

  const { createVDLoading, getCreateVD, createVDMessage, createVDData } = createVD();

  const handleBooking = async (values) => {
    getCreateVD(values);
  };

  useEffect(() => {
    if (createVDMessage && createVDMessage.includes('Successful')) {
      { toast.success(createVDMessage) }
    } else if(createVDMessage) {
      { toast.error(createVDMessage); }
    }
    //console.log ('createVDMessage:', createVDMessage);
  }, [createVDMessage]);

    const navigate = useNavigate();
    const navigateWithState = () => {
      navigate('/home', { state: { initialView: 'vehiclemaster' } });
    };

    return (
      <div className='flex flex-col items-center mt-14'>
      
        <Card className='mb-20 pb-12 w-9/12 justify-center bg-neutral-200'>
        <Toaster richColors position="top-center" />
          <form onSubmit={handleSubmit} >
            <CardTitle className='flex justify-center mt-10 text-3xl text-slate-950'>Choose to assign driver with a vehicle</CardTitle>
            <CardDescription className='flex justify-center text-base mt-2'>Make sure to fill all the details carefully.Please contact for any queries</CardDescription>

            <div className='grid grid-cols-2'>
              <div className='flex items-center justify-end mt-8'>
                <Label className='text-base font-semibold pr-4'>Driver Name</Label>
              </div>
              <div>
                <Select
                  onChange={handleChange}
                  onValueChange={(value) => setFormValues({ ...formValues, driver_name: value })}
                >
                  <SelectTrigger className="w-[300px] mt-8">
                    <SelectValue placeholder="Choose a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className='ml-8'>Select Driver name below</SelectLabel>
                      {readAvailableData && readAvailableData.length === 0 &&
                        <SelectItem className="flex items-center justify-center font-bold" value=" ">No Driver available now</SelectItem>
                      }
                      {readAvailableData && readAvailableData.map((item) => (
                        <SelectItem key={item._id} value={item.name} className="flex items-center justify-center font-semibold">
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className='text-red-500 text-xs italic'>{formErrors.driver_name}</p>
              </div>

              <div className='flex items-center justify-end mt-8'>
                <Label className='text-base font-semibold pr-4'>Vehicle Number</Label>
              </div>
              <div>
                <Select
                  onChange={handleChange}
                  onValueChange={(value) => setFormValues({ ...formValues, vehicle_unique_no: value })}
                >
                  <SelectTrigger className="w-[300px] mt-8">
                    <SelectValue placeholder="Choose a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className='ml-8'>Select Vehicle name below</SelectLabel>
                      {readAvailableVData && readAvailableVData.length === 0 &&
                        <SelectItem className="flex items-center justify-center font-bold" value=" ">No Vehicle available now</SelectItem>
                      }
                      {readAvailableVData && readAvailableVData.map((item) => (
                        <SelectItem key={item._id} value={item.unique_no.toString()} className="flex items-center justify-center font-semibold">
                          {item.vehicle_type} - {item.unique_no}({item.vehicle_no})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className='text-red-500 text-xs italic'>{formErrors.vehicle_unique_no}</p>
              </div>
            </div>

            <div className='flex justify-center mt-8'>
              <Button
                type={`${createVDLoading ? '' : 'primary'}`}
                appearance="primary"
                className='h-12 w-24 text-base'
              >
                {createVDLoading ? <ClassicSpinner /> : 'Submit'}
              </Button>
            </div>
          </form>
        </Card>

        <Button className='mb-20' onClick={navigateWithState}>Go Back</Button>

      </div>

    )
  }

  export default CreateVehicleDriverPage;