import React, { useEffect, useState } from 'react'

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { FaCalendar } from 'react-icons/fa';
import { DatePicker } from 'rsuite';
import { ClassicSpinner } from 'react-spinners-kit';

import { useAuth } from '../contexts/AuthContext';
import useBooking from '../hooks/useBooking';

const initialValues = {
  vehicle_type: "",
  people: "",
  start: "",
  destination: "",
  start_time: "",
  return_time: "",
  purpose: "",
  name: "",
  id: "",
  contact: "",
  email: "",
};

const Bookvehicle = () => {

  const { userData, logout } = useAuth();
  
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      name: userData.name,
      id: userData.id,
      contact: userData.contact,
      email: userData.email,
    });
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleBooking(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.vehicle_type) {
      errors.vehicle_type = "Vehicle Type is required";
    }
    if (!values.people) {
      errors.people = "Number of people is required";
    }
    if (!values.start) {
      errors.start = "Starting Place is required";
    }
    if (!values.destination) {
      errors.destination = "Reaching Place is required";
    }
    if (!values.start_time) {
      errors.start_time = "Starting time is required";
    }
    if (!values.return_time) {
      errors.return_time = "Returning Place is required";
    }
    if (!values.purpose) {
      errors.purpose = "Purpose is required";
    }
    return errors;
  };

  const { loading, bookForm, errorMessage } = useBooking();

  const handleBooking = async (values) => {
    console.log(values);
    bookForm(values);
    console.log(errorMessage);
    if(userData.name==null || userData.id==undefined || userData.contact==null || userData.email==null){
      toast.error("Complete the Profile to submit form")
    }
    if (errorMessage && errorMessage.includes("Successful")) {
      toast.success(errorMessage);
    } else {
      toast.error(errorMessage);
    }
  };
  

  return (
    <div className='flex mt-14 justify-center'>
    
      <Card className='mb-40 pb-12 w-9/12 bg-neutral-200'>
        <form onSubmit={handleSubmit}>
          <CardTitle className='flex justify-center mt-10 text-3xl text-slate-950'>Book your desired Vehicle</CardTitle>
          <CardDescription className='flex justify-center text-base mt-2'>Make sure to fill all the details carefully.Please contact for any queries</CardDescription>

          <div className='grid grid-cols-2'>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Vehicle Type</Label>
            </div>
            <div>
              <Select
                onChange={handleChange}
                onValueChange={(value) => setFormValues({ ...formValues, vehicle_type: value })}
              >
                <SelectTrigger className="w-[300px] mt-8">
                  <SelectValue placeholder="Choose a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vehicle Type</SelectLabel>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Battery Vehicle">Battery Vehicle</SelectItem>
                    <SelectItem value="Good Carriers">Good Carriers</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className='text-center text-red-500 text-xs italic'>{formErrors.vehicle_type}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Number of People</Label>
            </div>
            <div>
              <Input
                className='w-[300px] mt-8'
                placeholder='Enter number of people'
                type='number'
                name='people'
                value={formValues.people}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.people}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Staring place</Label>
            </div>
            <div>
              <Input
                className='w-[300px] mt-8'
                placeholder='Eg: BIT'
                type='text'
                name='start'
                value={formValues.start}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.start}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Starting time</Label>
            </div>
            <div>
              <DatePicker
                format="dd MMM yyyy hh:mm:ss aa"
                placeholder="Select Date and Time"
                showMeridian
                caretAs={FaCalendar}
                className='w-[300px] mt-8'
                name='start_time'
                value={formValues.start_time}
                onChange={(date) => {
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    start_time: date,
                  }));
                }}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.start_time}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Reaching place</Label>
            </div>
            <div>
              <Input
                className='w-[300px] mt-8'
                placeholder='Eg: Sathy'
                type='text'
                name='destination'
                value={formValues.destination}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.destination}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Returning time</Label>
            </div>
            <div>
              <DatePicker
                format="dd MMM yyyy hh:mm:ss aa"
                placeholder="Select Date and Time"
                showMeridian
                caretAs={FaCalendar}
                className='w-[300px] mt-8'
                name='return_time'
                value={formValues.return_time}
                onChange={(date) => {
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    return_time: date,
                  }));
                }}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.return_time}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Purpose</Label>
            </div>
            <div>
              <Input
                className='w-[300px] mt-8'
                placeholder='Eg: Placement activity,Club Activity'
                type='text'
                name='purpose'
                value={formValues.purpose}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.purpose}</p>
            </div>
          </div>
          
          <div className='flex justify-center mt-8'>
            <Button
              type={`${loading ? '' : 'primary'}`}
              appearance="primary"
              className='h-12 w-24 text-base'              
            >
              {loading ? <ClassicSpinner /> : 'Submit'}
            </Button>
          </div>
        </form>
      </Card>

    </div>

  )
}

export default Bookvehicle;