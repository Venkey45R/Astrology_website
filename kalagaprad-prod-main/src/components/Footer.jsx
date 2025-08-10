import React from 'react'
import { MdLocationCity, MdLocationOn } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { AiFillFacebook } from "react-icons/ai";
import { Clock, FileText, Mail, MapPin, Phone } from 'lucide-react';
const Footer = () => {
  return (

    <footer className="bg-black/40 border-t border-yellow-400/20 py-12 px-4 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900  text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-blue-200">
          <div>
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-green-400" /><span>+91 9553554048</span></div>
              <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-400" /><span>kalagaprasadastrology@gmail.com</span></div>

              <div className="flex items-center gap-3"><AiFillFacebook className="w-5 h-5 text-blue-400" /><a href='https://www.facebook.com/prasad.kalaga1'><span>Facebook</span></a></div>
              

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p>Kalaga Prasad Astrology Center</p>
                  <p>Tanuku, Andhra Pradesh</p>
                  <a href="https://maps.app.goo.gl/ohi7ZPQXF8UyY4hU7" className="text-yellow-400 hover:text-yellow-300 underline">View on Google Maps</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Services Areas</h3>
            <p>🏛️ Andhra Pradesh</p>
            <p>🏛️ Telangana</p>
            <p>🏛️ Karnataka</p>
            <p>🏛️ Tamil Nadu</p>
            <p>🏛️ Odisha</p>
            <p>🏛️ Maharashtra</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-300 mb-4">Consultation Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-yellow-400" /><div><p>Mon - Sat</p><p>9:00 AM - 6:00 PM</p></div></div>
              <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-yellow-400" /><div><p>Sunday</p><p>By Appointment</p></div></div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-yellow-400/20 text-center text-sm text-blue-200">
          <div className='flex justify-center items-center'>
            <a href='/refund-policy' className='mr-4 hover:underline'>Refund Policy</a>
            <a href='/business-policy' className='mr-4 hover:underline'>Business Policy</a>
            <a href='/terms' className='hover:underline '>Terms and Conditions</a>
          </div>
          <p className='mt-2'>&copy; 2024 Kalaga Prasad Astrology. All rights reserved.</p>
          <p className="mt-2 text-sm">Serving with 30+ years of experience in Scientific Astrology</p>
        </div>
      </footer>
  )
}

export default Footer
