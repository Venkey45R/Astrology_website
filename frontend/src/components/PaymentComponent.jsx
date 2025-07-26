import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const PaymentComponent = ({paymentAmount,formData,userInfo}) => {
  // console.log(userInfo)
  const navigate = useNavigate()
  const { error, isLoading, Razorpay } = useRazorpay();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  const handlePaymentSucess = async (data) =>{
    // console.log(data)
    const response = await axios.put(`${API_BASE_URL}/api/bookings/${data._id}`,{...data , payment_status : true},
        {
          headers: {
            Authorization: `Bearer ${token}`, // update as needed
          },
        })
    navigate('/PaymentSuccess');
  }
  // console.log(userInfo)
  const blockSlot = async () => {
      try {
        await axios.post(
          `${API_BASE_URL}/api/unavailable-slots`,
          {
            date: formData.pickedDate,
            timeSlot: formData.timeSlot,
            isAvailable: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Slot blocked successfully.");
      } catch (error) {
        console.error("Failed to block slot:", error);
      }
    };
  const handlePayment = async () => {
      const { data } = await axios.post(`${API_BASE_URL}/create-order`, {
        amount: paymentAmount*100
      });
       const formatedFormData = {
        booking_id: uuid(), 
        name: formData.name,
        email: userInfo.email,
        appointment_type: formData.appointmentType,
        whatsapp_number: formData.phone,
        city: formData.city,
        date: formData.pickedDate,
        time_slot: formData.timeSlot,
        payment_status: formData.paymentStatus 
      };
      let book;
     try{
       const booking = await axios.post(
        `${API_BASE_URL}/api/bookings`,
        formatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // update as needed
          },
        }
      );
       book = booking.data;
       await blockSlot();
     }
     catch(err){
      console.log(err)
     }
    
      const options = {
      key: "rzp_test_oL9kEoW0Vxdk0a",
      amount: paymentAmount*100, 
      currency: "INR",
      name: "Astro",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
      // console.log("Payment response:", response);
      try {
        // 1. Send payment verification data to backend
        const verifyRes = await axios.post(`${API_BASE_URL}/verify-payment`, {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,

        });
        // console.log(verifyRes,"hello")
        if (verifyRes.data.success) {
          // 2. Update booking payment status
          handlePaymentSucess(data)
          await axios.put(
            `${API_BASE_URL}/api/bookings/${book._id}`,
            { payment_status: true },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
         
          navigate("/PaymentSuccess");
        } else {
          toast.error("Payment verification failed.");
        }
         
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Something went wrong verifying the payment.");
      }
    },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.whatsapp_number,
      },
      theme: {
        color: "#401F8F",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      {isLoading && 
      <button className="bg-green-500 rounded-lg px-4 py-1 text-white opacity-50 hover:cursor-progress"  disabled={isLoading}>
        Pay Now
      </button>}
      {error && <p>Error loading Razorpay: {error}</p>}
      {
        !isLoading && (
          <button className="bg-green-500 rounded-lg px-4 py-1 text-white" onClick={handlePayment} disabled={isLoading}>
          Pay Now
        </button>
        )
      }
    </div>
  );
};

export default PaymentComponent;