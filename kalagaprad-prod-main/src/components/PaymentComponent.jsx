// src/components/PaymentComponent.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { load } from "@cashfreepayments/cashfree-js";

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const PaymentComponent = ({ paymentAmount, formData, userInfo }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
    }

    const initializeCashfree = async () => {
      try {
        const cashfreeJs = await load({
          mode: "production", 
        });
        setCashfree(cashfreeJs);
      } catch (error) {
        console.error("Failed to load Cashfree SDK:", error);
      }
    };
    initializeCashfree();
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
    const booking_id = uuid(); // This is the unique ID for the booking

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
      // Step 1: Create the booking in the DB first
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

    if (!cashfree) {
      toast.error(
        "Cashfree SDK not loaded. Please wait a moment and try again."
      );
      return;
    }

    try {
      // Step 2: Now call the backend payment route, passing the booking_id
      const response = await axios.post(
        `${API_BASE_URL}/api/cashfree/payment`,
        {
          amount: paymentAmount,
          firstname: formData.name,
          email: userInfo.email,
          phone: formData.phone,
          productinfo: "Astrology Booking",
          booking_id: formattedFormData.booking_id, // Pass the booking_id
        }
      );

      const { payment_session_id } = response.data;
      const checkoutOptions = {
        paymentSessionId: payment_session_id,
        redirectionMode: "redirect",
      };

      await cashfree.checkout(checkoutOptions);
    } catch (err) {
      console.error("Error initiating Cashfree payment:", err);
      toast.error("Payment initiation failed.");
    }
  };

  return (
    <div>
      <button
        className="px-4 py-1 text-white bg-green-500 rounded-lg"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentComponent;
