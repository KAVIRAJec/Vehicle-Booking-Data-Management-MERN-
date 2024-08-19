import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import Carousel from "better-react-carousel";

import { useAuth } from "../contexts/AuthContext";

const Dashboard = ({ onViewChange }) => {
  const [view, setView] = useState('dashboard');
  const { userData, logout } = useAuth();

  const handlePage = () => {
    userData.role === 'admin' ? onViewChange('pendingrequest') : onViewChange('bookvehicle');

  }

  return (
    <div className="-mb-10">
      <div className="mt-6 flex justify-center items-center mb-10">
        <Input type="text" className="px-3 py-2 w-96" placeholder="Search..." />
        <Button className="px-3 py-2 ml-2">
          <Search
            width={20}
            height={20}
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          />
        </Button>
      </div>

      <Carousel gap={16} col={1} loop={true} showDots={true} autoplay={2000} dotColorActive="#000">
        <Carousel.Item className="flex justify-center items-center">
          <img src="https://i.ibb.co/PCRXR6V/battery.png" alt="Battery" width="100%" style={{ height: "550px", opacity: 1 }} />
        </Carousel.Item>
        <Carousel.Item className="flex justify-center items-center">
          <img src="https://i.ibb.co/wKWp1kV/bus.png" alt="Bus" width="100%" style={{ height: "550px", opacity: 1 }} />
        </Carousel.Item>
        <Carousel.Item className="flex justify-center items-center">
          <img src="https://i.ibb.co/Y8KWSjz/car.png" alt="Car" width="100%" style={{ height: "550px", opacity: 1 }} />
        </Carousel.Item>
        <Carousel.Item className="flex justify-center items-center">
          <img src="https://i.ibb.co/3hYCTfC/truck.png" alt="Truck" width="100%" style={{ height: "550px", opacity: 1 }} />
        </Carousel.Item>
        <Carousel.Item className="flex justify-center items-center">
          <img src="https://i.ibb.co/sQYjt0b/truck1.png" alt="Bus" width="100%" style={{ height: "550px", opacity: 1 }} />
        </Carousel.Item>
        <Carousel.Item className="flex justify-center items-center">
          <img src="https://i.ibb.co/0sGVyV0/truck2.png" alt="Bus" width="100%" style={{ height: "550px", opacity: 1 }} />
        </Carousel.Item>
      </Carousel>

      <div className="grid grid-cols-2 gap-3 px-10 my-20">
        <div>
          <h1 className="text-slate-900 font-mono text-4xl font-extrabold py-14">
            Your Journey Start Here...
          </h1>
          <p className="text-slate-700 text-lg pt-4">
            Committed to your comfort, dedicated to your satisfaction. Creating excellence in every drive. Driving professionalism into every journey. Trust the experts.
          </p>
          <div className="text-right mr-12">
            <Button className="mt-8 p-6 text-base" onClick={handlePage}>Get Started</Button>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/vd99Z2Y/truck.jpg" alt="Truck" width="100%" className='rounded-xl h-[400px]' />
        </div>
      </div>

      <div className="grid grid-cols-3 mb-10">
        <div className="p-3 pl-6">
          <Card className="h-[340px] w-full bg-slate-200 hover:shadow-2xl transition-colors duration-100">
            <CardHeader className='flex flex-row justify-between'>
              <CardTitle className='flex'>Car</CardTitle>
              <Button variant='outline' className="flex bg-teal-700 text-white p-2 px-4 mb-2 rounded-xl transform -translate-y-3">Capacity: 6</Button>
            </CardHeader>
            <CardContent>
              <img src='https://i.ibb.co/B3vbJTN/bolero.png' alt="Car" width='100%' className="rounded-xl h-full" />
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button className='bg-gray-800 px-5' onClick={handlePage}>Book Now</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="p-3">
          <Card className="h-[340px] w-full bg-slate-200 hover:shadow-2xl transition-colors duration-100">
            <CardHeader className='flex flex-row justify-between'>
              <CardTitle className='flex'>Bus</CardTitle>
              <Button variant='outline' className="flex bg-teal-700 text-white p-2 px-4 mb-2 rounded-xl transform -translate-y-3">Capacity: 40</Button>
            </CardHeader>
            <CardContent className='flex justify-center'>
              <img src='https://i.ibb.co/C8Htt5s/Bus2.png' alt="Bus" width='78%' className="rounded-xl h-full" />
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button className='bg-gray-800 px-5' onClick={handlePage}>Book Now</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="p-3 pr-6">
          <Card className="h-[340px] w-full bg-slate-200 hover:shadow-2xl transition-colors duration-100">
            <CardHeader className='flex flex-row justify-between'>
              <CardTitle className='flex'>Goods Carriers</CardTitle>
              <Button variant='outline' className="flex bg-teal-700 text-white p-2 px-4 mb-2 rounded-xl transform -translate-y-3">Capacity: 1 ton</Button>
            </CardHeader>
            <CardContent className='flex justify-center'>
              <img src='https://i.ibb.co/4Jv9ZPw/Truck.png' alt="Car" width='64%' className="rounded-xl h-full" />
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button className='bg-gray-800 px-5' onClick={handlePage}>Book Now</Button>
            </CardFooter>
          </Card>
        </div>

        <footer className='grid grid-cols-3 bg-black text-white h-80 w-screen mt-10'>
          <div className="p-16 pl-32">
            <img src="https://i.ibb.co/r0VTkgS/vite.png" alt="Logo" className='h-40 w-40 rounded-full' />
            <p className="mt-2 font-mono font-extrabold text-xl">BIT Transports</p>
          </div>
          <div className="p-10 flex flex-col space-y-6">
            <div className="hover:text-slate-200 mt-6 transform hover:scale-105 transition-all duration-200">Support</div>
            <div className="hover:text-slate-200 transform hover:scale-105 transition-all duration-200">FAQ</div>
            <div className="hover:text-slate-200 transform hover:scale-105 transition-all duration-200">Terms of Service</div>
            <div className="hover:text-slate-200 transform hover:scale-105 transition-all duration-200">Privacy Policy</div>
          </div>
          <div className="-ml-20 mt-20">
            <p className="text-xl">Contact us</p>
            <div>
            <Input type="text" placeholder="Email" className="mt-2 w-72" />
            <Button className='mt-2'>Subscribe</Button>
            </div>            
          </div>
        </footer>

      </div>

    </div>

  );
};

export default Dashboard;
