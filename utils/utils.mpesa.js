import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

const baseURL =
  process.env.MPESA_ENV === "sandbox"
    ? "https://sandbox.safaricom.co.ke"
    : "https://api.safaricom.co.ke";

async function getAccessToken() {
  const url = `${baseURL}/oauth/v1/generate?grant_type=client_credentials`;
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Access Token Response:", data);

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch access token");
    }

    return data.access_token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error(error.message || "Failed to generate access token");
  }
}

function generatePassword() {
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(
    process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
  ).toString("base64");
  return { password, timestamp };
}

async function initiateSTKPush({
  phone,
  amount,
  accountReference,
  transactionDesc,
}) {
  const requiredFields = { phone, amount, accountReference, transactionDesc };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new Error(`${key} is required`);
    }
  }
  const token = await getAccessToken();
  const { password, timestamp } = generatePassword();
  const parsedAmount = Math.round(parseFloat(amount));
  
  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: parsedAmount,
    PartyA: phone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };


  try {
    const response = await fetch(`${baseURL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("STK Push Response:", data);
    if (!response.ok) {
      throw new Error(data.error || "Failed to initiate STK push");
    }

    return data;
  } catch (error) {
    console.error("Error initiating STK push:", error);
    throw new Error(error.message || "Failed to initiate STK push");
  }
}

export default initiateSTKPush;
