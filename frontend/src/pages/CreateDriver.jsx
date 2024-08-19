import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

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
import { FaCalendar } from 'react-icons/fa';
import { DatePicker } from 'rsuite';
import { ClassicSpinner } from 'react-spinners-kit';
import { Toaster, toast } from 'sonner'

import createDriver from '../hooks/useDriver';

const initialValues = {
  staff_id: "",
  name: "",
  contact: "",
  dl: "",
  dl_no: "",
  dl_exp: "",
  dl_type: "",
};

const CreateDriverPage = () => {

  const { createLoading, getCreate, createMessage, createData } = createDriver();

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      getCreate(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.staff_id) {
      errors.staff_id = "Staff ID is required";
    }
    if (!values.name) {
      errors.name = "Driver Name is required";
    }
    if (!values.contact) {
      errors.contact = "Contact Number is required";
    }
    if (values.contact && (values.contact.length < 10 || values.contact.length > 10)) {
      errors.contact = "Contact Number must be 10 digit";
    }
    if (!values.dl) {
      errors.dl = "Driving License is required";
    }
    if (!values.dl_no) {
      errors.dl_no = "Driving License Number is required";
    }
    if (!values.dl_exp) {
      errors.dl_exp = "Driving License Expiry is required";
    }
    if (!values.dl_type) {
      errors.dl_type = "Driving License Type required";
    }
    return errors;
  };

  useEffect(() => {
    if (createMessage && createMessage.includes('Successful')) {
      { toast.success(createMessage) }
    } else if (createMessage) {
      { toast.error(createMessage); }
    }
    //console.log ('createMessage:', createMessage);
  }, [createMessage]);



  return (
    <div className='flex flex-col items-center mt-14'>

      <Card className='mb-20 pb-12 w-9/12 justify-center bg-neutral-200'>
        <Toaster richColors position="top-center" />
        <form onSubmit={handleSubmit}>
          <CardTitle className='flex justify-center mt-10 text-3xl text-slate-950'>Create new Driver</CardTitle>
          <CardDescription className='flex justify-center text-base mt-2'>Make sure to fill all the details carefully.Please contact for any queries</CardDescription>

          <div className='grid grid-cols-2'>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Staff ID</Label>
            </div>
            <div>
              <Input
                type='text'
                className='w-[300px] mt-8'
                placeholder='Enter staff ID'
                name='staff_id'
                value={formValues.staff_id}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.staff_id}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Name</Label>
            </div>
            <div>
              <Input
                type='text'
                className='w-[300px] mt-8'
                placeholder='Enter driver name'
                name='name'
                value={formValues.name}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.name}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Contact</Label>
            </div>
            <div>
              <Input
                type='tel'
                className='w-[300px] mt-8'
                placeholder='Enter mobile number'
                name='contact'
                value={formValues.contact}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.contact}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Driving License</Label>
            </div>
            <div>
              <Input
                type='text'
                className='w-[300px] mt-8'
                placeholder='Enter License Details'
                name='dl'
                value={formValues.dl}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.dl}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Driving License Number</Label>
            </div>
            <div>
              <Input
                type='number'
                className='w-[300px] mt-8'
                placeholder='Enter License Number'
                name='dl_no'
                value={formValues.dl_no}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.dl_no}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Driving License Expiry</Label>
            </div>
            <div>
              <DatePicker
                format="dd/MM/yyyy"
                placeholder="Select Expiry Date"
                showMeridian
                caretAs={FaCalendar}
                className='w-[300px] mt-8'
                name='dl_exp'
                value={formValues.dl_exp}
                onChange={(date) => {
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    dl_exp: date,
                  }));
                }}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.dl_exp}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Driving License Type</Label>
            </div>
            <div>
              <Select
                onChange={handleChange}
                onValueChange={(value) => setFormValues({ ...formValues, dl_type: value })}
              >
                <SelectTrigger className="w-[300px] mt-8">
                  <SelectValue placeholder="Choose License Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className='ml-8'>Select License type below</SelectLabel>
                    <SelectItem value="Heavy Vehicle(HTV)" className="flex items-center justify-center font-semibold">
                      Heavy Vehicle(HTV)
                    </SelectItem>
                    <SelectItem value="Light Vehicle(LMV)" className="flex items-center justify-center font-semibold">
                      Light Vehicle(LMV)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className='text-center text-red-500 text-xs italic'>{formErrors.dl_type}</p>
            </div>
          </div>

          <div className='flex justify-center mt-8'>
            <Button
              type={`${createLoading ? '' : 'primary'}`}
              appearance="primary"
              className='h-12 w-24 text-base'
            >
              {createLoading ? <ClassicSpinner /> : 'Submit'}
            </Button>
          </div>
        </form>
      </Card>

      <Link to="/driverMaster">
        <Button className='mb-20'>Go Back</Button>
      </Link>
    </div>

  )
}

export default CreateDriverPage;