// cashfreeRoutes.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const {
  CASHFREE_CLIENT_ID,
  CASHFREE_CLIENT_SECRET,
  CASHFREE_API_URL,
  CLIENT_URL,
} = process.env;

router.post("/payment", async (req, res) => {
  try {
    // Retrieve the booking_id from the request body
    const { amount, firstname, email, phone, productinfo, booking_id } =
      req.body;

    // Use the booking_id as the order_id for Cashfree
    const order_id = booking_id;
    const order_currency = "INR";
    const order_amount = amount;

    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);
    const order_expiry_time = expiryTime.toISOString();

    const paymentSessionResponse = await axios.post(
      `${CASHFREE_API_URL}/orders`,
      {
        order_id, // This is now the same as your booking_id
        order_amount,
        order_currency,
        customer_details: {
          customer_id: booking_id,
          customer_email: email,
          customer_phone: phone,
        },
        order_meta: {
          notify_url: `${CLIENT_URL}/api/cashfree/payment-webhook`,
          return_url: `${CLIENT_URL}/payment-status?order_id={order_id}`,
        },
        order_expiry_time,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": CASHFREE_CLIENT_ID,
          "x-client-secret": CASHFREE_CLIENT_SECRET,
        },
      }
    );

    const payment_session_id = paymentSessionResponse.data.payment_session_id;

    return res.json({
      success: true,
      payment_session_id,
      order_id,
    });
  } catch (error) {
    console.error(
      "Error initiating Cashfree payment:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ success: false, message: "Payment initiation failed." });
  }
});
// New endpoint to handle Cashfree webhook notifications
router.post("/payment-webhook", (req, res) => {
  // Cashfree sends the payment details in the request body
  const { order_id, order_status, order_amount, customer_details } = req.body; // For testing purposes, just log the details
  console.log("✅ Cashfree Webhook Received:");
  console.log("Order ID:", order_id);
  console.log("Order Status:", order_status);
  console.log("Amount:", order_amount);
  console.log("Customer Details:", customer_details); // Here, you would typically: // 1. Verify the webhook signature to ensure it's from Cashfree. // 2. Update the booking status in your database based on order_id and order_status. // 3. Send a confirmation email to the user. // Respond with a 200 OK status to acknowledge receipt of the webhook.
  res.status(200).send("Webhook received");
});

module.exports = router;
