import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ClassicSpinner, MetroSpinner } from 'react-spinners-kit';
import { Pagination, RadioGroup, Radio } from 'rsuite';
import Table from 'rsuite/Table';

import { deleteVehicleDriver, editDVehicleDriver, editVVehicleDriver, readAllVehicleDriver } from '../hooks/useVehicleDriver';
import { readAvailableVehicle } from '../hooks/useVehicle';
import { readAvailableDriver } from '../hooks/useDriver';
const { Column, HeaderCell, Cell } = Table;

const VehicleDriverMaster = () => {

  const { loading, readAllData, errorMessage, data } = readAllVehicleDriver();
  const { readAvailableLoading, getReadAvailable, readAvailableMessage, readAvailableData } = readAvailableDriver();
  const { readAvailableVLoading, getReadAvailableV, readAvailableVMessage, readAvailableVData } = readAvailableVehicle();

  const [editData, setEditData] = useState('/updateDriver');
  const [formValues, setFormValues] = useState({
    vehicle_unique_no: '',
    driver_name: '',
  });
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
      console.log('formValues:', formValues);
      { editData === '/updateVehicle' ? handleVEditing(formValues) : handleDEditing(formValues) }
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (editData === '/updateVehicle' && !values.vehicle_unique_no) {
      errors.vehicle_unique_no = 'Vehicle Number is required';
    }
    if (editData === '/updateDriver' && !values.driver_name) {
      errors.driver_name = 'Driver Name is required';
    }
    return errors;
  };

  const { editVLoading, editV, editVMessage, editVData } = editVVehicleDriver();
  const { editDLoading, editD, editDMessage, editDData } = editDVehicleDriver();
  const { deleteVDLoading, getDeleteVD, deleteVDMessage, deleteVDData } = deleteVehicleDriver();

  const handleVEditing = async (values) => {
    editV(values);
  };
  const handleDEditing = async (values) => {
    editD(values);
  };
  const handleDelete = async (driverName, vehicleUniqueNo) => {
    getDeleteVD({ driver_name: driverName, vehicle_unique_no: vehicleUniqueNo });
  };

  useEffect(() => {
    if (editVMessage && editVMessage.includes('Successful')) {
      { toast.success(editVMessage) }
    } else if (editVMessage) {
      { toast.error(editVMessage); }
    }
    if (editDMessage && editDMessage.includes('Successful')) {
      { toast.success(editDMessage) }
    } else if (editDMessage) {
      { toast.error(editDMessage); }
    }
    if (deleteVDMessage && deleteVDMessage.includes('Successful')) {
      { toast.success(deleteVDMessage) }
    } else if (deleteVDMessage) {
      { toast.error(deleteVDMessage); }
    }
    console.log('editMessage:', editDMessage);
  }, [editVMessage, editDMessage, deleteVDMessage]);

  useEffect(() => {
    const fetchData = async () => {
      await readAllData();
      console.log('read all data:', errorMessage, data);
      showToast();
    };
    fetchData();
  }, []);

  const showToast = () => {
    if (!data && errorMessage) {
      { toast.error(errorMessage) }
    }
  }

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [bordered, setBordered] = useState(true);
  const [hover, setHover] = useState(true);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const masterData = data ? data.mappings : null;

  let tableData;
  if (masterData) {
    tableData = masterData.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
  }

  return (
    <div>
      <div className='flex'>
        <div className='flex flex-col'>
          <div className='text-3xl text-black mt-12 ml-8 font-bold'>
            Vehicle Driver Master
          </div>
          <div className='text-lg text-black mt-1 ml-8'>
            Here is the vehicle & driver which are linked together
          </div>
        </div>
        <div className='flex justify-end mt-12 mr-8 flex-grow'>
          <Link to='/driverMaster'>
            <Button className='mx-2'>View Driver</Button>
          </Link>
          <Link to='/vehicleMaster'>
            <Button className='mx-2'>View Vehicle</Button>
          </Link>
        </div>
      </div>
      {
        !loading ? (

          (masterData && tableData ? (
            <div className='mt-6 ml-5  mr-5'>
              <Toaster richColors position="top-center" />
              <Table
                height={350}
                data={tableData}
                hover={hover}
                bordered={bordered}
                cellBordered={bordered}
                color='black'
              >
                <Column align="center" flexGrow={1} minWidth={100}>
                  <HeaderCell className='text-base text-black font-semibold'>Driver Name</HeaderCell>
                  <Cell className='text-slate-950' dataKey="driver_name" />
                </Column>
                <Column align="center" flexGrow={1} minWidth={250}>
                  <HeaderCell className='text-base text-black font-semibold'>Vehicle Number</HeaderCell>
                  <Cell className='text-slate-950' dataKey="vehicle_unique_no" />
                </Column>
                <Column align='center' flexGrow={2} minWidth={250}>
                  <HeaderCell flexGrow={2} className='text-base text-black font-semibold'>Action</HeaderCell>
                  <Cell>
                    {rowData => {
                      return (
                        <div className="flex items-center justify-center -mt-2">
                          <Dialog>
                            <DialogTrigger className="flex items-center" onClick={(e) => e.stopPropagation()}>
                              <Button className='h-9 mx-2'>View</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]" open>
                              <DialogHeader onClick={(e) => e.stopPropagation()}>
                                <DialogTitle className='text-2xl text-black flex items-center justify-center'>Vehicle Driver Details</DialogTitle>
                                <DialogDescription>
                                  Make sure to verify all details here. Go to edit to Change it
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <Label className="text-right text-xl text-black font-bold" >
                                  Vehicle Number:
                                </Label>
                                <Label className='text-base text-black'>
                                  {rowData.vehicle_unique_no}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driver Name:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.driver_name}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Availability:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.is_available ? 'Available' : 'Not Available'}
                                </Label>
                              </div>
                              <DialogFooter>
                                <DialogClose>
                                  <Button className='items-start' >Close</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger className="flex items-center" onClick={(e) => e.stopPropagation()}>
                              <Button className='h-9 mx-2'>Edit</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]" open>
                              <DialogHeader onClick={(e) => e.stopPropagation()}>
                                <DialogTitle className='text-2xl text-black flex items-center justify-center'>Edit Vehicle Driver</DialogTitle>
                                <DialogDescription>
                                  Make sure to fill all the details here. Click Save Changes to save
                                </DialogDescription>
                              </DialogHeader>
                              <Label className='text-base font-semibold flex justify-center text-slate-700'>Choose the type of edit</Label>
                              <RadioGroup
                                className='flex justify-evenly items-center' color='#0000' inline appearance="picker"
                                
                                onChange={(value) => {
                                  setEditData(value);
                                  (value === '/updateVehicle') ? setFormValues({
                                    vehicle_unique_no: '', driver_name: rowData.driver_name
                                  })
                                    : setFormValues({ vehicle_unique_no: rowData.vehicle_unique_no, driver_name: '' });
                                }}
                              >
                                <Radio color='#0000' value="/updateDriver">Change Driver</Radio>
                                <Radio color='#0000' value="/updateVehicle">Change Vehicle</Radio>
                              </RadioGroup>
                              <form onSubmit={handleSubmit} >
                                <div className='grid grid-cols-2'>
                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>Driver Name</Label>
                                  </div>
                                  <div>
                                    {editData === '/updateVehicle' ? (
                                      <>
                                        <Input
                                          readOnly
                                          defaultValue={rowData.driver_name}
                                          className="w-[180px] mt-8"
                                        />
                                      </>
                                    ) : (<>
                                      <Select
                                        onChange={handleChange}
                                        onValueChange={(value) => setFormValues({ ...formValues, driver_name: value })}
                                      >
                                        <SelectTrigger className="w-[180px] mt-8">
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
                                      <p className='text-red-500 text-xs italic'>{formErrors.driver_name}</p></>
                                    )}
                                  </div>

                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>Vehicle Number</Label>
                                  </div>
                                  <div>
                                    {editData === '/updateDriver' ? (<>
                                      <Input
                                        readOnly
                                        defaultValue={rowData.vehicle_unique_no}
                                        className="w-[180px] mt-8"
                                      />
                                    </>
                                    ) : (<>
                                      <Select
                                        onChange={handleChange}
                                        onValueChange={(value) => setFormValues({ ...formValues, vehicle_unique_no: value })}
                                      >
                                        <SelectTrigger className="w-[180px] mt-8">
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
                                      <p className='text-red-500 text-xs italic'>{formErrors.vehicle_unique_no}</p></>
                                    )}
                                  </div>
                                </div>

                                <DialogFooter className='mt-5'>
                                  <DialogClose>
                                    <Button variant="ghost" className="items-start">Close</Button>
                                  </DialogClose>
                                  <Button type={`${(editDLoading || editVLoading) ? '' : 'primary'}`}>
                                    {(editVLoading || editDLoading) ? <ClassicSpinner /> : 'Save Changes'}
                                  </Button>
                                </DialogFooter>
                              </form>


                            </DialogContent>
                          </Dialog>

                          <Button className='h-9 mx-2'
                            onClick={() => {
                              handleDelete(rowData.driver_name, rowData.vehicle_unique_no)
                            }}>{deleteVDLoading ? <ClassicSpinner /> : 'Delete'}</Button>
                        </div>
                      );
                    }}
                  </Cell>
                </Column>
              </Table>
              <div className="flex justify-center mt-4">
                <Link to='/vehicleDriverMaster/create'>
                  <Button>
                    Create Vehicle-Driver Master
                  </Button>
                </Link>
              </div>
              <div style={{ padding: 20 }}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="md"
                  layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                  total={tableData.length}
                  limitOptions={[10, 30, 50]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                />
              </div>
            </div>
          ) : <Card className='mt-10 mx-20 h-[200px] flex items-center justify-center'>
            <CardContent>
              <CardTitle className='text-xl font-medium text-slate-800'>
                No Data available
              </CardTitle>
            </CardContent>
          </Card>
          )

        ) :
          <div className='flex items-center justify-center mt-40'>
            <MetroSpinner size={50} color="#000" loading={true} />
          </div>
      }

    </div>
  )
}

export default VehicleDriverMaster
