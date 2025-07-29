import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const PaymentComponent = ({ paymentAmount, formData, userInfo }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

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
  const booking_id = uuid();

  const formattedFormData = {
    booking_id,
    name: formData.name,
    email: userInfo.email,
    appointment_type: formData.appointmentType,
    whatsapp_number: formData.phone,
    city: formData.city,
    date: formData.pickedDate,
    time_slot: formData.timeSlot,
    payment_status: false,
  };

  let book;
  try {
    const booking = await axios.post(
      `${API_BASE_URL}/api/bookings`,
      formattedFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    book = booking.data;
    await blockSlot();
  } catch (err) {
    console.error(err);
    toast.error("Booking creation failed.");
    return;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/payu/payment`, {
      amount: paymentAmount,
      firstname: formData.name,
      email: userInfo.email,
      phone: formData.phone,
      productinfo: "Astrology Booking",
    });

    const { action, params } = response.data;

    const form = document.createElement("form");
    form.method = "POST";
    form.action = action;

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  } catch (err) {
    console.error("Error initiating PayU payment:", err);
    toast.error("Payment initiation failed.");
  }
};


  return (
    <div>
      <button
        className="bg-green-500 rounded-lg px-4 py-1 text-white"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;
