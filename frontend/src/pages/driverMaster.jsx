import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClassicSpinner, MetroSpinner } from 'react-spinners-kit';
import { Pagination } from 'rsuite';
import Table from 'rsuite/Table';

import { deleteDriver, readAllDriver, updateDriver } from '../hooks/useDriver';
const { Column, HeaderCell, Cell } = Table;

const DriverMaster = () => {

  const { readAllLoading, getReadAll, readAllMessage, readAllData } = readAllDriver();
  const { deleteLoading, getDelete, deleteMessage, deleteData } = deleteDriver()
  const { updateLoading, getUpdate, updateMessage, updateData } = updateDriver();
  const [formValues, setFormValues] = useState({
    staff_id: '',
    contact: '',
    dl: '',
    dl_no: '',
    dl_exp: '',
    dl_type: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getReadAll();
      console.log('read all data:', readAllMessage, readAllData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (readAllMessage && readAllMessage.includes('Successful')) {
      { toast.success(readAllMessage) }
    } else if (readAllMessage) {
      { toast.error(readAllMessage); }
    }
    if (deleteMessage && deleteMessage.includes('successful')) {
      { toast.success(deleteMessage) }
    } else if (deleteMessage) {
      { toast.error(deleteMessage); }
    }
    if (updateMessage && updateMessage.includes('successful')) {
      { toast.success(updateMessage) }
    } else if (updateMessage) {
      { toast.error(updateMessage); }
    }
  }, [readAllMessage, deleteMessage, updateMessage]);

  const handleDelete = async (name) => {
    getDelete({ name: name });
  };

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

  const removeEmptyValues = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ""));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const cleanedFormValues = removeEmptyValues(formValues);
      console.log('New formValues:', cleanedFormValues);
      getUpdate(cleanedFormValues)
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (values.contact && values.contact.length < 9)
      errors.contact = 'Contact Numbers must be 10 digits';
    return errors;
  };


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [bordered, setBordered] = useState(true);
  const [hover, setHover] = useState(true);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const masterData = readAllData ? readAllData.drivers : null;

  let tableData;
  if (masterData) {
    tableData = masterData.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });
  }

  const navigate = useNavigate();
  const navigateWithState = () => {
    navigate('/home', { state: { initialView: 'vehiclemaster' } });
  };

  return (
    <div>
      <div className='flex'>
        <div className='flex flex-col'>
          <div className='text-3xl text-black mt-12 ml-8 font-semibold'>
            <Toaster richColors position="top-center" />
            Driver Master
          </div>
          <div className='text-lg text-black mt-1 ml-8'>
            Here is the list of all Driver details
          </div>
        </div>
        <div className='flex justify-end mt-12 mr-8 flex-grow'>
          <Button className='mb-20 mr-10' onClick={navigateWithState}>Go Back</Button>
        </div>
      </div>
      {
        !readAllLoading ? (

          (masterData && tableData ? (
            <div className='mt-6 ml-5  mr-5 h-auto'>
              <Table
                height={400}
                data={tableData}
                hover={hover}
                bordered={bordered}
                cellBordered={bordered}
                color='black'
              >
                <Column align="center" flexGrow={1} minWidth={50}>
                  <HeaderCell className='text-base text-black font-semibold'>Staff ID</HeaderCell>
                  <Cell className='text-slate-950' dataKey="staff_id" />
                </Column>
                <Column align="center" flexGrow={1} minWidth={250}>
                  <HeaderCell className='text-base text-black font-semibold'>Driver Name</HeaderCell>
                  <Cell className='text-slate-950' dataKey="name" />
                </Column>
                <Column align="center" flexGrow={1} minWidth={250}>
                  <HeaderCell className='text-base text-black font-semibold'>mappings</HeaderCell>
                  <Cell className='text-slate-950' dataKey="mapped">
                    {rowData => rowData.mapped ? 'Yes' : 'No'}
                  </Cell>
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
                            <DialogContent className="sm:max-w-[425px] max-h-[600px] overflow-y-scroll" open>
                              <DialogHeader onClick={(e) => e.stopPropagation()}>
                                <DialogTitle className='text-2xl text-black flex items-center justify-center'>Driver Details</DialogTitle>
                                <DialogDescription>
                                  Make sure to verify all details here. Go to edit to Change it
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-2 items-center gap-4">
                                <Label className="text-right text-xl text-black font-bold" >
                                  Staff ID:
                                </Label>
                                <Label className='text-base text-black'>
                                  {rowData.staff_id}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driver Name:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.name}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Contact:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.contact}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driving License:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.dl}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driving License number:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.dl_no}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driving License Expiry:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.dl_exp}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Driving License Type:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.dl_type}
                                </Label>
                                <Label className="text-right text-xl  text-black font-bold">
                                  Mapping:
                                </Label>
                                <Label className='text-base font-normal'>
                                  {rowData.mapped ? 'Done' : 'Not Yet'}
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
                            <DialogContent className="sm:max-w-[425px]  max-h-[600px] overflow-y-scroll" open>
                              <DialogHeader onClick={(e) => e.stopPropagation()}>
                                <DialogTitle className='text-2xl text-black flex items-center justify-center pb-2'>Edit Driver Details</DialogTitle>
                                <DialogDescription>
                                  Make sure to fill all the details here. Click Save Changes to save
                                </DialogDescription>
                              </DialogHeader>
                              <form onSubmit={handleSubmit} >
                                <div className='grid grid-cols-2'>
                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>Driver Name</Label>
                                  </div>
                                  <Input
                                    readOnly
                                    defaultValue={rowData.name}
                                    className="w-[180px] mt-8"
                                    onClick={() => { setFormValues({ ...formValues, name: rowData.name }) }}
                                  />
                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>Staff ID</Label>
                                  </div>
                                  <div>
                                    <Input
                                      type='text'
                                      name="staff_id"
                                      className="w-[180px] mt-8"
                                      value={formValues.staff_id}
                                      onChange={handleChange}
                                    />
                                    <p className='text-red-500 text-xs italic'>{formErrors.staff_id}</p>
                                  </div>
                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>Contact Number</Label>
                                  </div>
                                  <div>
                                    <Input
                                      type='number'
                                      name="contact"
                                      value={formValues.contact}
                                      className="w-[180px] mt-8"
                                      onChange={handleChange}
                                    />
                                    <p className='text-red-500 text-xs italic'>{formErrors.contact}</p>
                                  </div>
                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>Driving License</Label>
                                  </div>
                                  <div>
                                    <Input
                                      type='text'
                                      name="dl"
                                      value={formValues.dl}
                                      className="w-[180px] mt-8"
                                      onChange={handleChange}
                                    />
                                    <p className='text-red-500 text-xs italic'>{formErrors.dl}</p>
                                  </div>
                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>Driving License Number</Label>
                                  </div>
                                  <div>
                                    <Input
                                      type='text'
                                      name="dl_no"
                                      value={formValues.dl_no}
                                      className="w-[180px] mt-8"
                                      onChange={handleChange}
                                    />
                                    <p className='text-red-500 text-xs italic'>{formErrors.dl_no}</p>
                                  </div>
                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>License Expire date</Label>
                                  </div>
                                  <div>
                                    <Input
                                      type='date'
                                      name="dl_exp"
                                      value={formValues.dl_exp}
                                      className="w-[180px] mt-8"
                                      onChange={handleChange}
                                    />
                                    <p className='text-red-500 text-xs italic'>{formErrors.dl_exp}</p>
                                  </div>
                                  <div className='flex items-center justify-end mt-8'>
                                    <Label className='text-base font-semibold pr-4'>Driving License Type</Label>
                                  </div>
                                  <div>
                                    <Select
                                      onChange={handleChange}
                                      onValueChange={(value) => setFormValues({ ...formValues, dl_type: value })}
                                    >
                                      <SelectTrigger className="w-[180px] mt-8">
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
                                    <p className='text-red-500 text-xs italic'>{formErrors.dl_type}</p>
                                  </div>
                                </div>

                                <DialogFooter className='mt-5'>
                                  <DialogClose>
                                    <Button variant="ghost" className="items-start">Close</Button>
                                  </DialogClose>
                                  <Button type={`${updateLoading ? '' : 'primary'}`}>
                                    {(updateLoading) ? <ClassicSpinner /> : 'Save Changes'}
                                  </Button>
                                </DialogFooter>
                              </form>


                            </DialogContent>
                          </Dialog>

                          <Button
                            className='h-9 mx-2'
                            onClick={() => {
                              handleDelete(rowData.name)
                            }}>{deleteLoading ? <ClassicSpinner /> : 'Delete'}
                          </Button>
                        </div>
                      );
                    }}
                  </Cell>
                </Column>
              </Table>
              <div className="flex justify-center mt-4">
                <Link to='/driver/create'>
                  <Button>
                    Create Driver
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

export default DriverMaster
