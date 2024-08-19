import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClassicSpinner, MetroSpinner } from 'react-spinners-kit';
import { Pagination } from 'rsuite';
import Table from 'rsuite/Table';

import { deleteVehicle, readAllVehicle, updateVehicle } from '../hooks/useVehicle';
const { Column, HeaderCell, Cell } = Table;

const VehicleMaster = () => {
    const { readAllVLoading, getReadAllV, readAllVMessage, readAllVData } = readAllVehicle();
    const { updateVLoading, getUpdateV, updateVMessage, updateVData } = updateVehicle();
    const { deleteVLoading, getDeleteV, deleteVMessage, deleteVData } = deleteVehicle();
    const [formValues, setFormValues] = useState({
        vehicle_no: '',
        unique_no: '',
        vehicle_type: '',
        reg_date: '',
        road_tax: '',
        green_tax: '',
        permit: '',
        FC: '',
        PC: '',
        insurance: '',
        insurance_exp: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            await getReadAllV();
            console.log('read all data:', readAllVLoading, readAllVData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (readAllVMessage && readAllVMessage.includes('Successful')) {
            { toast.success(readAllVMessage) }
        } else if (readAllVMessage) {
            { toast.error(readAllVMessage); }
        }
        if (deleteVMessage && deleteVMessage.includes('successful')) {
            { toast.success(deleteVMessage) }
        } else if (deleteVMessage) {
            { toast.error(deleteVMessage); }
        }
        if (updateVMessage && updateVMessage.includes('successful')) {
            { toast.success(updateVMessage) }
        } else if (updateVMessage) {
            { toast.error(updateVMessage); }
        }
    }, [readAllVMessage, deleteVMessage, updateVMessage]);

    const handleDelete = async (unique_no) => {
        getDeleteV({ unique_no: unique_no });
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
            getUpdateV(cleanedFormValues)
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        //form validation
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

    const masterData = readAllVData ? readAllVData.vehicles : null;

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
                        Vehicle Master
                    </div>
                    <div className='text-lg text-black mt-1 ml-8'>
                        Here is the list of all vehicles details
                    </div>
                </div>
                <div className='flex justify-end mt-12 mr-8 flex-grow'>
                    <Button className='mb-20 mr-10' onClick={navigateWithState}>Go Back</Button>
                </div>
            </div>
            {
                !readAllVLoading ? (

                    (masterData && tableData ? (
                        <div className='mt-6 ml-5  mr-5'>
                            <Table
                                height={400}
                                data={tableData}
                                hover={hover}
                                bordered={bordered}
                                cellBordered={bordered}
                                color='black'
                            >
                                <Column align="center" flexGrow={1} minWidth={50}>
                                    <HeaderCell className='text-base text-black font-semibold'>Vehicle Number</HeaderCell>
                                    <Cell className='text-slate-950' dataKey="vehicle_no" />
                                </Column>
                                <Column align="center" flexGrow={1} minWidth={50}>
                                    <HeaderCell className='text-base text-black font-semibold'>Unique Number</HeaderCell>
                                    <Cell className='text-slate-950' dataKey="unique_no" />
                                </Column>
                                <Column align="center" flexGrow={1} minWidth={50}>
                                    <HeaderCell className='text-base text-black font-semibold'>Vehicle Type</HeaderCell>
                                    <Cell className='text-slate-950' dataKey="vehicle_type" />
                                </Column>
                                <Column align="center" flexGrow={1} minWidth={50}>
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
                                                                <DialogTitle className='text-2xl text-black flex items-center justify-center'>Vehicle Details</DialogTitle>
                                                                <DialogDescription>
                                                                    Make sure to verify all details here. Go to edit to Change it
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid grid-cols-2 items-center gap-4">
                                                                <Label className="text-right text-xl text-black font-bold" >
                                                                    Vehicle Number:
                                                                </Label>
                                                                <Label className='text-base text-black'>
                                                                    {rowData.vehicle_no}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Unique Number:
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.unique_no}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Vehicle Type:
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.vehicle_type}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Registration Date
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.reg_date}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Road Tax:
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.road_tax}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Green Tax:
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.green_tax}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Permit
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.permit}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Fitness Certificate:
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.FC}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Pollution Certificate:
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.PC}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Insurance
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.insurance}
                                                                </Label>
                                                                <Label className="text-right text-xl  text-black font-bold">
                                                                    Insurance Expire Date
                                                                </Label>
                                                                <Label className='text-base font-normal'>
                                                                    {rowData.insurance_exp}
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
                                                                <DialogTitle className='text-2xl text-black flex items-center justify-center pb-2'>Edit Vehicle Details</DialogTitle>
                                                                <DialogDescription>
                                                                    Make sure to fill all the details here. Click Save Changes to save
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <form onSubmit={handleSubmit} >
                                                                <div className='grid grid-cols-2'>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Unique Number</Label>
                                                                    </div>
                                                                    <Input
                                                                        readOnly
                                                                        defaultValue={rowData.unique_no}
                                                                        className="w-[180px] mt-8"
                                                                        onClick={() => { setFormValues({ ...formValues, unique_no: rowData.unique_no }) }}
                                                                    />
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Vehicle Number</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            type='text'
                                                                            name="vehicle_no"
                                                                            className="w-[180px] mt-8"
                                                                            value={formValues.vehicle_no}
                                                                            onChange={handleChange}
                                                                        />
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.vehicle_no}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Vehicle Type</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Select
                                                                            onChange={handleChange}
                                                                            onValueChange={(value) => setFormValues({ ...formValues, vehicle_type: value })}
                                                                        >
                                                                            <SelectTrigger className="w-[180px] mt-8">
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
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.vehicle_type}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Registration Date</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            type='date'
                                                                            name="reg_date"
                                                                            value={formValues.reg_date}
                                                                            className="w-[180px] mt-8"
                                                                            onChange={handleChange}
                                                                        />
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.reg_date}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Road Tax</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            type='text'
                                                                            name="road_tax"
                                                                            value={formValues.road_tax}
                                                                            className="w-[180px] mt-8"
                                                                            onChange={handleChange}
                                                                        />
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.road_tax}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Green Tax</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            type='text'
                                                                            name="green_tax"
                                                                            value={formValues.green_tax}
                                                                            className="w-[180px] mt-8"
                                                                            onChange={handleChange}
                                                                        />
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.green_tax}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Permit</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Select
                                                                            onChange={handleChange}
                                                                            onValueChange={(value) => setFormValues({ ...formValues, permit: value })}
                                                                        >
                                                                            <SelectTrigger className="w-[180px] mt-8">
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
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.permit}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Fitness Certificate</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            type='text'
                                                                            name="FC"
                                                                            value={formValues.FC}
                                                                            className="w-[180px] mt-8"
                                                                            onChange={handleChange}
                                                                        />
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.FC}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Pollution Certificate</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            type='text'
                                                                            name="PC"
                                                                            value={formValues.PC}
                                                                            className="w-[180px] mt-8"
                                                                            onChange={handleChange}
                                                                        />
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.PC}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Insurance</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            type='text'
                                                                            name="insurance"
                                                                            value={formValues.insurance}
                                                                            className="w-[180px] mt-8"
                                                                            onChange={handleChange}
                                                                        />
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.insurance}</p>
                                                                    </div>
                                                                    <div className='flex items-center justify-end mt-8'>
                                                                        <Label className='text-base font-semibold pr-4'>Insurance Expiry Date</Label>
                                                                    </div>
                                                                    <div>
                                                                        <Input
                                                                            type='date'
                                                                            name="insurance_exp"
                                                                            value={formValues.insurance_exp}
                                                                            className="w-[180px] mt-8"
                                                                            onChange={handleChange}
                                                                        />
                                                                        <p className='text-red-500 text-xs italic'>{formErrors.insurance_exp}</p>
                                                                    </div>
                                                                </div>

                                                                <DialogFooter className='mt-5'>
                                                                    <DialogClose>
                                                                        <Button variant="ghost" className="items-start">Close</Button>
                                                                    </DialogClose>
                                                                    <Button type={`${updateVLoading ? '' : 'primary'}`}>
                                                                        {(updateVLoading) ? <ClassicSpinner /> : 'Save Changes'}
                                                                    </Button>
                                                                </DialogFooter>
                                                            </form>


                                                        </DialogContent>
                                                    </Dialog>

                                                    <Button
                                                        className='h-9 mx-2'
                                                        onClick={() => {
                                                            handleDelete(rowData.unique_no)
                                                        }}>{deleteVLoading ? <ClassicSpinner /> : 'Delete'}
                                                    </Button>
                                                </div>
                                            );
                                        }}
                                    </Cell>
                                </Column>
                            </Table>
                            <div className="flex justify-center mt-4">
                                <Link to='/vehicle/create'>
                                    <Button>
                                        Create Vehicle
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

export default VehicleMaster
