const express = require("express");
const crypto = require("crypto");
const router = express.Router();
require("dotenv").config();

const {
  PAYU_MERCHANT_KEY,
  PAYU_MERCHANT_SALT,
  PAYU_BASE_URL,      // "https://secure.payu.in" for production
  PAYU_SUCCESS_URL,   // e.g., "http://localhost:3000/payment-success"
  PAYU_FAILURE_URL    // e.g., "http://localhost:3000/payment-failure"
} = process.env;

// Generate hash for payment request
const generateHash = (data) => {
  const hashString = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${PAYU_MERCHANT_SALT}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
};

// Payment initiation endpoint
router.post("/payment", (req, res) => {
  const { amount, firstname, email, phone, productinfo } = req.body;

  const txnid = `TXN${Date.now()}`;
  const data = {
    key: PAYU_MERCHANT_KEY,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    phone,
    surl: PAYU_SUCCESS_URL,
    furl: PAYU_FAILURE_URL,
    service_provider: "payu_paisa",
  };

  const hash = generateHash(data);

  return res.json({
    action: `${PAYU_BASE_URL}/_payment`,
    params: {
      ...data,
      hash,
    },
  });
});

// Optional: Payment callback verification (not mandatory for redirect)
router.post("/callback", (req, res) => {
  const {
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    status,
    hash: payuHash, // note: payu sends it as `hash` not `posted_hash`
  } = req.body;

  const hashSequence = `${PAYU_MERCHANT_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  const generatedHash = crypto.createHash("sha512").update(hashSequence).digest("hex");

  if (generatedHash === payuHash) {
    console.log("✅ PayU Callback Verified Successfully");
    return res.redirect(`${PAYU_SUCCESS_URL}?txnid=${txnid}`);
  } else {
    console.log("❌ Callback hash mismatch");
    return res.redirect(`${PAYU_FAILURE_URL}?txnid=${txnid}`);
  }
});


module.exports = router;
