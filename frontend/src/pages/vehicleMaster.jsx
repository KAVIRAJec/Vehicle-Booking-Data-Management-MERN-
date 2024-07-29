import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Toaster, toast } from 'sonner';
import { ClassicSpinner, MetroSpinner } from 'react-spinners-kit';
import { Table, Pagination, SelectPicker } from 'rsuite';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { deleteVehicle, readAllVehicle, updateVehicle } from '@/hooks/useVehicle';
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
                                                                                    <SelectLabel className='ml-8'>Select Driver name below</SelectLabel>
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
