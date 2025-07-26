

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router';

axios.defaults.withCredentials = true;

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");


const AppointmentViewer = () => {
const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedView, setSelectedView] = useState(null);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
        const token = Cookies.get("token");
      try {
        const response = await axios.get(`${API_BASE_URL}/api/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data); 
        console.log(response.data)
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    getBookings();
  }, []);
  return (
    <div className='relative w-full min-h-screen'>
        
        {
            isViewOpen && (
                <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full text-black'>
                    <div className='w-[500px] h-[400px] bg-white rounded-lg border relative shadow-lg py-8 px-4'>
                        <div className='w-[35px] h-[35px] rounded-full border absolute right-2 top-2 flex justify-center items-center shadow-lg hover:cursor-pointer' onClick={()=> setIsViewOpen(false)}>  
                            <IoCloseOutline />
                        </div>
                        <div>
                            <h1 className='text-xl'>
                                Appointment Details
                            </h1>
                            <div className='grid flex-col w-full grid-cols-2 px-4 my-4 gap-y-4'>
                                <div className='col-span-1'>
                                    Name
                                </div>
                                <div className='flex items-end justify-end col-span-1'>
                                    {selectedView.name}
                                </div>
                                <div className='col-span-1'>
                                    Date
                                </div>
                                <div className='flex items-end justify-end col-span-1'>
                                    {new Date(selectedView.date).toISOString().split('T')[0]}
                                </div>
                                <div className='col-span-1'>
                                    Appointment Type
                                </div>
                                <div className='flex items-end justify-end col-span-1'>
                                    {selectedView.appointment_type}
                                </div>
                                <div className='col-span-1'>
                                    Email
                                </div>
                                <div className='flex items-end justify-end col-span-1'>
                                    {selectedView.email}
                                </div>
                                 <div className='col-span-1'>
                                    Phone Number
                                </div>
                                <div className='flex items-end justify-end col-span-1'>
                                    {selectedView.whatsapp_number}
                                </div>
                                <div className='col-span-1'>
                                    Time Slot
                                </div>
                                <div className='flex items-end justify-end col-span-1'>
                                    {selectedView.time_slot}
                                </div>
                            </div>
                            <button className='w-full py-4 text-white bg-black rounded-lg'>
                                Send Email Reminder
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        <div className='max-w-6xl py-16 mx-auto'>
            <div className='flex items-center w-full text-4xl'>
                <h2>Total Appointments</h2>
                <p className='pl-8'>{bookings.length}</p>
            </div>
            <h1 className='mt-8 text-lg'>Your Appointments </h1>
            <div className='w-full mt-4 overflow-hidden border rounded-lg'>
                <table className='w-full'>
               <tr className='text-white bg-black'>
                <th className='px-4 py-2 border-r'>OrderId</th>
                <th className='px-4 py-2 border-r'>Name</th>
                <th className='px-4 py-2 border-r'>Email</th>
                <th className='px-4 py-2 border-r'>Phone</th>
                <th className='px-4 py-2 border-r'>Apt. Type</th>
                <th className='px-4 py-2 border-r'>Details</th>
                <th className='px-4 py-2 '>Status</th>
               </tr>
               {
                bookings.map((order) => (
                    <tr className='border-t'>
                <td className='px-4 py-2 border-r'>
                    {order.booking_id.slice(0,10)+"..."}
                </td >
                <td className='px-4 py-2 border-r'>
                    {order.name}
                </td>
                <td className='px-4 py-2 border-r'>
                    {order?.email}
                </td>
                <td className='px-4 py-2 border-r'>
                    {order.whatsapp_number}
                </td>
                <td className='px-4 py-2 border-r'>
                    {order.appointment_type}
                </td>
                <td className='px-4 py-2 border-r'>
                    <p className='text-blue-600 hover:underline hover:cursor-pointer' onClick={()=> {setIsViewOpen(true)
                        setSelectedView(order)
                    }}>
                        view
                    </p>
                </td>
                <td className='px-4 py-2 border-r'>{order.payment_status ? (<p className='text-green-500'>Paid</p>) :(<p className='text-red-500'>Failed</p>)}</td>
               </tr>
                ))
               }
               
            </table>
            </div>
        </div>
    </div>
  )
}

export default AppointmentViewer