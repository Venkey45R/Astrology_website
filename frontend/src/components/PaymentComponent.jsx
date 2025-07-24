import axios from "axios";
import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
const PaymentComponent = ({paymentAmount,formData,userInfo}) => {
  const navigate = useNavigate()
  const { error, isLoading, Razorpay } = useRazorpay();
  const handlePaymentSucess = async (data) =>{
    console.log(data)
    const response = await axios.put(`https://astroprod.onrender.com/api/bookings/${data._id}`,{...data , payment_status : true})
    navigate('/PaymentSuccess');
  }
  const handlePayment = async () => {
      const { data } = await axios.post('https://astroprod.onrender.com/create-order', {
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
       const booking = await axios.post("https://astroprod.onrender.com/api/bookings",formatedFormData)
       book = booking.data;
     }
     catch(err){
      console.log(err)
     }
      paymentAmount = paymentAmount*100
      const options = {
      key: "rzp_test_oL9kEoW0Vxdk0a",
      amount: {paymentAmount}, 
      currency: "INR",
      name: "Astro",
      description: "Test Transaction",
      order_id: data.id,
      handler:  handlePaymentSucess(book),
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
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