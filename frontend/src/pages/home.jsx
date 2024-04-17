import React, { Profiler, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Bell, BellDot, BusFront, CircleCheckBig, CircleUserRound, Cog, History, LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { Label } from "@/components/ui/label.jsx";
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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Dialog,
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
import { MdManageAccounts, MdOutlineCancel } from "react-icons/md";
import Dashboard from "./Dashboard.jsx";
import Bookvehicle from "./bookvehicle";
import Requesthistory from "./requesthistory";
import Vehilclemaster from "./vehilclemaster.jsx";
import Pendingrequest from "./pendingrequest.jsx";
import Approvedrequest from "./approvedrequest.jsx";
import Rejectedrequest from "./rejectedrequest.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";

const Home = () => {
    const { userData, logout } = useAuth();
    const [view, setView] = useState('dashboard');
    const [notification, setNotification] = useState(false);

    const handleLogout = async () => {
        await logout();
    };
    
    const renderView = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard />;
            case 'bookvehicle':
                return <Bookvehicle />;//user
            case 'requesthistory':
                return <Requesthistory />;//user
            case 'pendingrequest':
                return <Pendingrequest />//admin
            case 'vehiclemaster':
                return <Vehilclemaster />;//admin
            case 'approvedrequest':
                return <Approvedrequest />//admin
            case 'rejectedrequest':
                return <Rejectedrequest />//admin
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col absolute pl-3 mt-4 text-white font-bold text-2xl">
                Welcome to {userData.role} Page
            </div>
            <div className="flex items-center justify-end text-white bg-slate-600 h-[70px] pr-3 border-b-2 shadow-xl">
                <TooltipProvider>
                <Sheet>
                    <Tooltip>
                        <TooltipTrigger>
                        <SheetTrigger>
                            {notification ? <BellDot color="#de5f35" className="mr-5 mt-2 cursor-pointer" /> : <Bell className="mr-5 mt-2 cursor-pointer" />}
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
                    <DropdownMenuTrigger className="flex items-center mr-2">
                        {userData.role === 'admin' ? <MdManageAccounts className="h-8 w-8 mx-0 cursor-pointer" /> : <CircleUserRound className="h-8 w-8 mx-0 cursor-pointer" />}
                        <span className="ml-1">{userData.name}</span>
                    </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                            <DropdownMenuLabel className="text-base">Profile</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Dialog>
                                        <DialogTrigger className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Edit Profile</span>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]" open="true">
                                            <DialogHeader onClick={(e) => e.stopPropagation()}>
                                                <DialogTitle>Edit profile</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your profile here. Click save when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4" onClick={(e) => e.stopPropagation()}>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        defaultValue={userData.name}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="id" className="text-right">
                                                        College ID
                                                    </Label>
                                                    <Input
                                                        id="id"
                                                        defaultValue={userData.id}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="contact" className="text-right">
                                                        Contact Number
                                                    </Label>
                                                    <Input
                                                        id="contact"
                                                        defaultValue={userData.contact}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="email" className="text-right">
                                                        Email ID
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        disabled
                                                        defaultValue={userData.email}
                                                        className="col-span-3"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button className='items-start' >Close</Button>
                                                <Button type="submit">Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex">
                <div className="flex-col p-4 bg-slate-200 h-screen max-w-[16rem]">

                    <div className="flex py-3 border-b-2 border-slate-400 cursor-pointer" onClick={() => setView('dashboard')}>
                        <LayoutDashboard className="h-8 w-8 text-slate-700" />
                        <Label className="block pl-3 text-xl text-slate-700 cursor-pointer">Dashboard</Label>
                    </div>

                    {userData.role === 'user' && (
                        <div className="flex my-3 cursor-pointer" onClick={() => setView('bookvehicle')}>
                            <BusFront className="h-8 w-8 text-slate-700" />
                            <Label className="block ml-3 text-xl text-slate-700 cursor-pointer">Book Vehicle</Label>
                        </div>
                    )}
                    {userData.role === 'user' && (
                        <div className="flex my-3 cursor-pointer" onClick={() => setView('requesthistory')}>
                            <History className="h-8 w-8 text-slate-700" />
                            <Label className="block ml-3 text-xl text-slate-700 cursor-pointer">Request History</Label>
                        </div>
                    )}

                    {userData.role === 'admin' && (
                        <div className="flex my-3 cursor-pointer" onClick={() => setView('pendingrequest')}>
                            <History className="h-8 w-8 text-slate-700" />
                            <Label className="block ml-3 text-xl text-slate-700 cursor-pointer">Pending Request</Label>
                        </div>
                    )}
                    {userData.role === 'admin' && (
                        <div className="flex my-3 cursor-pointer" onClick={() => setView('approvedrequest')}>
                            <CircleCheckBig className="h-7 w-8 text-slate-700" />
                            <Label className="block ml-3 text-xl text-slate-700 cursor-pointer">Approved Request</Label>
                        </div>
                    )}
                    {userData.role === 'admin' && (
                        <div className="flex my-3 cursor-pointer" onClick={() => setView('rejectedrequest')}>
                            <MdOutlineCancel className="h-8 w-8 text-slate-700" />
                            <Label className="block ml-3 text-xl text-slate-700 cursor-pointer">Rejected Request</Label>
                        </div>
                    )}
                    {userData.role === 'admin' && (
                        <div className="flex my-3 cursor-pointer" onClick={() => setView('vehiclemaster')}>
                            <Cog className="h-8 w-8 text-slate-700" />
                            <Label className="block ml-3 text-xl text-slate-700 cursor-pointer">Vehicle Master</Label>
                        </div>
                    )}
                    <div className="flex my-3">
                        <button className="block flex" onClick={handleLogout}>
                            <LogOut className="h-8 w-8 text-slate-700 cursor-pointer" />
                            <Label className="block ml-3 text-xl text-slate-700 cursor-pointer">Log Out</Label>
                        </button>
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