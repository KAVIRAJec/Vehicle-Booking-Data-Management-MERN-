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

import createVehicle from '../hooks/useVehicle';

const initialValues = {
  vehicle_no: "",
  unique_no: "",
  vehicle_type: "",
  reg_date: "",
  road_tax: "",
  green_tax: "",
  permit: "",
  FC: "",
  PC: "",
  insurance: "",
  insurance_exp: "",
};

const CreateVehiclePage = () => {

  const { createVLoading, getCreateV, createVMessage, createVData } = createVehicle();

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
      getCreateV(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.vehicle_no) {
      errors.vehicle_no = "Vehicle number is required";
    }
    if (!values.unique_no) {
      errors.unique_no = "Unique number is required";
    }
    if (!values.vehicle_type) {
      errors.vehicle_type = "Vehicle type is required";
    }
    if (!values.reg_date) {
      errors.reg_date = "Registration date is required";
    }
    if (!values.road_tax) {
      errors.road_tax = "Road Tax is required";
    }
    if (!values.green_tax) {
      errors.green_tax = "Green Tax is required";
    }
    if (!values.permit) {
      errors.permit = "Vehicle Permit is required";
    }
    if (!values.FC) {
      errors.FC = "Fitness certificate is required";
    }
    if (!values.PC) {
      errors.PC = "Pollution certificate is required";
    }
    if (!values.insurance) {
      errors.insurance = "Insurance document is required";
    }
    if (!values.insurance_exp) {
      errors.insurance_exp = "Insurance Expiry is required";
    }
    return errors;
  };

  useEffect(() => {
    if (createVMessage && createVMessage.includes('Successful')) {
      { toast.success(createVMessage) }
    } else if (createVMessage) {
      { toast.error(createVMessage); }
    }
    //console.log ('createVMessage:', createVMessage);
  }, [createVMessage]);


  return (
    <div className='flex flex-col items-center mt-14'>

      <Card className='mb-20 pb-12 w-9/12 justify-center bg-neutral-200'>
        <Toaster richColors position="top-center" />
        <form onSubmit={handleSubmit}>
          <CardTitle className='flex justify-center mt-10 text-3xl text-slate-950'>Create new Vehicle</CardTitle>
          <CardDescription className='flex justify-center text-base mt-2'>Make sure to fill all the details carefully.Please contact for any queries</CardDescription>

          <div className='grid grid-cols-2'>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Vehicle Number</Label>
            </div>
            <div>
              <Input
                type='text'
                className='w-[300px] mt-8'
                placeholder='Enter vehicle number'
                name='vehicle_no'
                value={formValues.vehicle_no}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.vehicle_no}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Unique Number</Label>
            </div>
            <div>
              <Input
                type='number'
                className='w-[300px] mt-8'
                placeholder='create unique number'
                name='unique_no'
                value={formValues.unique_no}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.unique_no}</p>
            </div>
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
              <Label className='text-base font-semibold pr-4'>Registration Date</Label>
            </div>
            <div>
              <DatePicker
                format="dd/MM/yyyy"
                placeholder="Select Date and Time"
                showMeridian
                caretAs={FaCalendar}
                className='w-[300px] mt-8'
                name='reg_date'
                value={formValues.reg_date}
                onChange={(date) => {
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    reg_date: date,
                  }));
                }}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.reg_date}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Road Tax</Label>
            </div>
            <div>
              <Input
                type='text'
                className='w-[300px] mt-8'
                placeholder='Enter road tax details'
                name='road_tax'
                value={formValues.road_tax}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.road_tax}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Green Tax</Label>
            </div>
            <div>
              <Input
                type='text'
                className='w-[300px] mt-8'
                placeholder='Enter green tax details'
                name='green_tax'
                value={formValues.green_tax}
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.green_tax}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Permit</Label>
            </div>
            <div>
              <Select
                onChange={handleChange}
                onValueChange={(value) => setFormValues({ ...formValues, permit: value })}
              >
                <SelectTrigger className="w-[300px] mt-8">
                  <SelectValue placeholder="Choose Permit Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className='ml-8'>Select Permitted area below</SelectLabel>
                    <SelectItem value="Car(NA)" className="flex items-center justify-center font-semibold">
                      Car (Not Applicable)
                    </SelectItem>
                    <SelectItem value="Bus-Coimbatore" className="flex items-center justify-center font-semibold">
                      Bus - Coimbatore
                    </SelectItem>
                    <SelectItem value="Bus-Tiruppur" className="flex items-center justify-center font-semibold">
                      Bus - Tiruppur
                    </SelectItem>
                    <SelectItem value="Bus-Namakkal" className="flex items-center justify-center font-semibold">
                      Bus - Namakkal
                    </SelectItem>
                    <SelectItem value="Bus-Erode" className="flex items-center justify-center font-semibold">
                      Bus - Erode
                    </SelectItem>
                    <SelectItem value="Goods carrier" className="flex items-center justify-center font-semibold">
                      Goods carrier
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className='text-center text-red-500 text-xs italic'>{formErrors.permit}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Fitness Certificate</Label>
            </div>
            <div>
              <Input
                type='text'
                placeholder='Enter fitness certificate details'
                name="FC"
                value={formValues.FC}
                className="w-[300px] mt-8"
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.FC}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Pollution Certificate</Label>
            </div>
            <div>
              <Input
                type='text'
                placeholder='Enter pollution certificate details'
                name="PC"
                value={formValues.PC}
                className="w-[300px] mt-8"
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.PC}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Insurance</Label>
            </div>
            <div>
              <Input
                type='text'
                placeholder='Enter insurance details'
                name="insurance"
                value={formValues.insurance}
                className="w-[300px] mt-8"
                onChange={handleChange}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.insurance}</p>
            </div>
            <div className='flex items-center justify-end mt-8'>
              <Label className='text-base font-semibold pr-4'>Insurance Expiry Date</Label>
            </div>
            <div>
            <DatePicker
                format="dd/MM/yyyy"
                placeholder="Select Date and Time"
                showMeridian
                caretAs={FaCalendar}
                className='w-[300px] mt-8'
                name='reg_date'
                value={formValues.insurance_exp}
                onChange={(date) => {
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    insurance_exp: date,
                  }));
                }}
              />
              <p className='text-center text-red-500 text-xs italic'>{formErrors.insurance_exp}</p>
              </div>
          </div>

          <div className='flex justify-center mt-8'>
            <Button
              type={`${createVLoading ? '' : 'primary'}`}
              appearance="primary"
              className='h-12 w-24 text-base'
            >
              {createVLoading ? <ClassicSpinner /> : 'Submit'}
            </Button>
          </div>
        </form>
      </Card>

      <Link to="/vehicleMaster">
        <Button className='mb-20'>Go Back</Button>
      </Link>
    </div>

  )
}

export default CreateVehiclePage;