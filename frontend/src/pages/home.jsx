import React, { Profiler, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../components/ui/button";
import { Toaster, toast } from 'sonner'
import { Input } from "../components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Bell, BellDot, BusFront, CircleCheckBig, CircleUserRound, Cog, History, LayoutDashboard, LogOut, Menu, User, UserPlus, UserRoundCog } from "lucide-react";
import { MdManageAccounts, MdOutlineCancel } from "react-icons/md";
import { ClassicSpinner } from "react-spinners-kit";

import { useAuth } from "../contexts/AuthContext.jsx";
import useEdit from "../hooks/useEdit.js";

import Dashboard from "./Dashboard.jsx";
import Bookvehicle from "./bookvehicle";
import Requesthistory from "./requesthistory";
import VehicleDriverMaster from "./vehicleDriverMaster.jsx";
import Pendingrequest from "./pendingrequest.jsx";
import Approvedrequest from "./approvedrequest.jsx";
import Rejectedrequest from "./rejectedrequest.jsx";

const initialValues = { name: "", id: "", contact: "", email: "" };

const Home = ({ initialView }) => {
    const location = useLocation();

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
            email: userData.email,
        });
        const errors = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            handleEdit(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        if (!values.id) {
            errors.id = "College ID is required";
        }
        if (!values.contact) {
            errors.contact = "Contact Number is required";
        }
        return errors;
    };

    const { loading, error, errorMessage, editUser } = useEdit();

    const handleEdit = async (values) => {
        editUser(values);
        if (errorMessage && errorMessage.includes("Data Edited successfully")) {
            toast.success(errorMessage);
        } else {
            toast.error(errorMessage);
        }
    };

    const { userData, logout } = useAuth();
    const [view, setView] = useState(initialView);
    const [notification, setNotification] = useState(false);

    const handleViewChange = (newView) => {
        setView(newView);
    }
    useEffect(() => {
        const initialView = location.state ? location.state.initialView : 'dashboard';
        handleViewChange(initialView);
    }, [location.state]);

    const handleLogout = async () => {
        await logout();
    };

    const renderView = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard onViewChange={handleViewChange} />;
            case 'bookvehicle':
                return <Bookvehicle />;//user
            case 'requesthistory':
                return <Requesthistory />;//user
            case 'pendingrequest':
                return <Pendingrequest />//admin
            case 'vehiclemaster':
                return <VehicleDriverMaster />;//admin
            case 'approvedrequest':
                return <Approvedrequest />//admin
            case 'rejectedrequest':
                return <Rejectedrequest />//admin
            default:
                return <Dashboard onViewChange={handleViewChange} />;
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col absolute pl-3 m-4 text-white font-bold font-sans italic hover:not-italic text-2xl">
                <img src="https://i.ibb.co/r0VTkgS/vite.png" alt="Vite" className="absolute h-10 w-10 rounded-xl hover:opacity-95" />
                <span className="ml-10 pl-3 text-white font-bold font-sans italic hover:not-italic text-2xl">Welcome to {userData.role} Page</span>
            </div>
            <div className="flex items-center justify-end text-white bg-slate-900 h-[70px] pr-3 border-b-2 shadow-xl">
                <TooltipProvider>
                    <Sheet>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <SheetTrigger>
                                    {notification ? <BellDot color="#de5f35" className="mr-5 mt-2 cursor-pointer animate-bounce" /> : <Bell className="mr-5 mt-2 cursor-pointer hover:h-7 w-7" />}
                                </SheetTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                notification
                            </TooltipContent>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle className="text-base">Notification</SheetTitle>
                                    <SheetDescription>
                                        Here's a Notification which you have got
                                    </SheetDescription>
                                </SheetHeader>
                                {notification ?
                                    <div>{Notification}</div> :
                                    <div className="mt-8 mb-5 flex text-xl text-slate-700 items-center justify-center">
                                        No New Notifications
                                    </div>
                                }

                                <SheetFooter>
                                    <SheetClose>
                                        <Button type='Close'>Close</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Tooltip>
                    </Sheet>
                </TooltipProvider>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center mr-2 hover:text-sky-200">
                        {userData.role === 'admin' ? <MdManageAccounts className="h-8 w-8 mx-0 cursor-pointer" /> : <CircleUserRound className="h-8 w-8 mx-0 cursor-pointer" />}
                        <span className="ml-1">{userData.name}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-64'>
                        <DropdownMenuLabel className="text-base bg-zinc-200 rounded-lg p-3">Profile</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="p-3">
                                <Dialog>
                                    <DialogTrigger className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        <span>Edit Profile</span>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]" open>
                                        <form onSubmit={handleSubmit}>
                                            <DialogHeader onClick={(e) => e.stopPropagation()}>
                                                <DialogTitle>Edit profile</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your profile here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4" onClick={(e) => e.stopPropagation()}>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        className="col-span-3"
                                                        value={formValues.name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <p className='text-end text-red-500 text-xs italic'>{formErrors.name}</p>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        College ID
                                                    </Label>
                                                    <Input
                                                        name="id"
                                                        type="text"
                                                        className="col-span-3"
                                                        value={formValues.id}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <p className='text-end text-red-500 text-xs italic'>{formErrors.id}</p>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Contact Number
                                                    </Label>
                                                    <Input
                                                        name="contact"
                                                        type="Number"
                                                        className="col-span-3"
                                                        value={formValues.contact}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <p className='text-end text-red-500 text-xs italic'>{formErrors.contact}</p>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label className="text-right">
                                                        Email ID
                                                    </Label>
                                                    <Input
                                                        disabled
                                                        defaultValue={userData.email}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose>
                                                    <Button variant="ghost" className="items-start">Close</Button>
                                                </DialogClose>
                                                <Button type="submit">
                                                    {loading ? <ClassicSpinner /> : 'Save Changes'}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="p-3">
                                <Dialog>
                                    <DialogTrigger className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                        <UserRoundCog className="mr-2 h-4 w-4" />
                                        View Profile
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]" open>
                                        <DialogHeader onClick={(e) => e.stopPropagation()}>
                                            <DialogTitle className='text-2xl'>Profile Details</DialogTitle>
                                            <DialogDescription>
                                                Make sure to verify your profile details here. Go to edit profile to Change it
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid grid-cols-2 items-center gap-4">
                                            <Label className="text-right text-xl" >
                                                Name:
                                            </Label>
                                            <Label className='text-base font-normal'>
                                                {userData.name}
                                            </Label>
                                            <Label className="text-right text-xl">
                                                College ID:
                                            </Label>
                                            <Label className='text-base font-normal'>
                                                {userData.id}
                                            </Label>
                                            <Label className="text-right text-xl">
                                                Email:
                                            </Label>
                                            <Label className='text-base font-normal'>
                                                {userData.email}
                                            </Label>
                                            <Label className="text-right text-xl">
                                                Mobile:
                                            </Label>
                                            <Label className='text-base font-normal'>
                                                {userData.contact}
                                            </Label>
                                            <Label className='text-right text-xl'>
                                                Role:
                                            </Label>
                                            <Label className='text-base font-normal'>
                                                {userData.role}
                                            </Label>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose>
                                                <Button className='items-start' >Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>

                                </Dialog>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='p-3' onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex">
                <div className="flex-shrink-0 flex-col p-4 bg-zinc-200 max-h-full min-h-screen w-2/12">
                    <Toaster richColors position="top-center" />
                    <div className="flex py-3 border-b-2 border-slate-400 cursor-pointer w-full hover:text-slate-50 hover:bg-gray-300 hover:rounded-2xl" onClick={() => setView('dashboard')}>
                        <LayoutDashboard className="h-8 w-8 text-slate-900 hover:h-9" />
                        <Label className="block pl-3 mt-0.5 text-xl text-slate-900 cursor-pointer hover:text-[21px] hover:text-slate-600 font-bold">Dashboard</Label>
                    </div>

                    {userData.role === 'user' && (
                        <div className="flex py-3 cursor-pointer w-full hover:bg-gray-300 hover:rounded-2xl" onClick={() => setView('bookvehicle')}>
                            <BusFront className="h-8 w-8 text-slate-900 hover:h-9" />
                            <Label className="block ml-3 text-xl text-slate-900 cursor-pointer hover:text-[21px] hover:text-slate-600 font-bold">Book Vehicle</Label>
                        </div>
                    )}
                    {userData.role === 'user' && (
                        <div className="flex py-3 cursor-pointer w-full hover:bg-gray-300 hover:rounded-2xl" onClick={() => setView('requesthistory')}>
                            <History className="h-8 w-8 text-slate-900 hover:h-9" />
                            <Label className="block ml-3 text-xl text-slate-900 cursor-pointer hover:text-[21px] hover:text-slate-600 font-bold">Request History</Label>
                        </div>
                    )}

                    {userData.role === 'admin' && (
                        <div className="flex py-3 cursor-pointer w-full hover:bg-gray-300 hover:rounded-2xl" onClick={() => setView('pendingrequest')}>
                            <History className="h-8 w-8 text-slate-900 hover:h-9" />
                            <Label className="block ml-3 text-xl text-slate-900 cursor-pointer hover:text-[21px] hover:text-slate-600 font-bold">Pending Request</Label>
                        </div>
                    )}
                    {userData.role === 'admin' && (
                        <div className="flex py-3 cursor-pointer w-full hover:bg-gray-300 hover:rounded-2xl" onClick={() => setView('approvedrequest')}>
                            <CircleCheckBig className="h-7 w-8 text-slate-900 hover:h-9" />
                            <Label className="block ml-3 text-xl text-slate-900 cursor-pointer hover:text-[20px] hover:text-slate-600 font-bold">Approved Request</Label>
                        </div>
                    )}
                    {userData.role === 'admin' && (
                        <div className="flex py-3 cursor-pointer w-full hover:bg-gray-300 hover:rounded-2xl" onClick={() => setView('rejectedrequest')}>
                            <MdOutlineCancel className="h-8 w-8 text-slate-900 hover:h-9" />
                            <Label className="block ml-3 text-xl text-slate-900 cursor-pointer hover:text-[21px] hover:text-slate-600 font-bold">Rejected Request</Label>
                        </div>
                    )}
                    {userData.role === 'admin' && (
                        <div className="flex py-3 cursor-pointer w-full hover:bg-gray-300 hover:rounded-2xl" onClick={() => setView('vehiclemaster')}>
                            <Cog className="h-8 w-8 text-slate-900 hover:h-9" />
                            <Label className="block ml-3 text-xl text-slate-900 cursor-pointer hover:text-[21px] hover:text-slate-600 font-bold">Vehicle Master</Label>
                        </div>
                    )}
                    <div>
                        <div className="flex py-3 cursor-pointer w-full hover:bg-gray-300 hover:rounded-2xl" onClick={handleLogout}>
                            <LogOut className="h-8 w-8 text-slate-900 cursor-pointer hover:h-9" />
                            <Label className="block ml-3 text-xl text-slate-900 cursor-pointer hover:text-[21px] hover:text-slate-600 font-bold">Log Out</Label>
                        </div>
                    </div>
                </div>
                <div className="flex-grow">
                    {renderView()}
                </div>
            </div>
        </div>
    );
};

export default Home;