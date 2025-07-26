import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const UserOrders = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("You are not logged in. Redirecting to sign-in.");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to load profile. Please log in again.");
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("id");
        navigate("/");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) return;
      try {
        const token = Cookies.get("token");
        const res = await axios.get(
          `${API_BASE_URL}/api/bookings/find-by-email/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setBookings(res.data);
        // console.log("Bookings:", res.data);
      } catch (err) {
        console.error("Failed to load bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <div className="text-center text-yellow-300 mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">My Orders</h2>
      {bookings.length === 0 ? (
        <div className="text-white">You have no orders yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((order, idx) => (
            <div
              key={idx}
              className="bg-purple-800 border border-yellow-300 rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                Booking #{order._id.slice(-5).toUpperCase()}
              </h3>
              <p className="text-white text-sm">
                <span className="font-medium text-yellow-300">Date:</span> {order.date.slice(0, 10)}
              </p>
              <p className="text-white text-sm">
                <span className="font-medium text-yellow-300">Time Slot:</span> {order.time_slot}
              </p>
              <p className="text-white text-sm">
                <span className="font-medium text-yellow-300">Status:</span> {order.payment_status ? "Paid" : "Pending"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
