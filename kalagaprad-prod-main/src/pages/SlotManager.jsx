import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
// Ensure axios sends cookies with requests
axios.defaults.withCredentials = true;

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");



const generateTimeSlots = () => {
  const start = new Date();
  start.setHours(8, 0, 0, 0); // 08:00 AM
  const end = new Date();
  end.setHours(19, 30, 0, 0); // Last slot ends at 08:00 PM

  const slots = [];

  while (start < end) {
    const from = new Date(start);
    start.setMinutes(start.getMinutes() + 30);
    const to = new Date(start);

    const format = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    slots.push(`${format(from)} - ${format(to)}`);
  }

  return slots;
};
const timeSlots = generateTimeSlots()

const SlotManager = () => {
const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSlots = async () => {
    const token = Cookies.get("token"); 
    try {
      const res = await axios.get(`${API_BASE_URL}/api/unavailable-slots`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setSlots(res.data);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleAddSlot = async () => {
    if (!selectedDate || !selectedSlot) return;
    const token = Cookies.get("token");
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/unavailable-slots`, {
        date: selectedDate,
        timeSlot: selectedSlot,
        isAvailable: false,
      }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      await fetchSlots(); // Refresh list
      setSelectedDate('');
      setSelectedSlot('');
    } catch (err) {
      console.error('Failed to add slot:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    try {
      await axios.delete(`http://localhost:8080/api/unavailable-slots/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      await fetchSlots();
    } catch (err) {
      console.error('Failed to delete slot:', err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-black">
      <h1 className="text-xl font-bold mb-4">Unavailable Time Slot Manager</h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Time Slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddSlot}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Add Slot'}
        </button>
      </div>

      <hr className="my-6" />

      <h2 className="text-lg font-semibold mb-2">Unavailable Slots</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time Slot</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot._id}>
              <td className="p-2 border">{new Date(slot.date).toLocaleDateString()}</td>
              <td className="p-2 border">{slot.timeSlot}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(slot._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {slots.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No unavailable slots found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SlotManager