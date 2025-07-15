import Payment from "../models/payment.js";
import Invoice from "../models/invoice.js";
import User from "../models/user.js";
import initiateSTKPush from "../utils/utils.mpesa.js";

// Create a new payment record
const createPayment = async ({ invoiceId, note } = {}) => {
  const requiredFields = { invoiceId };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new Error(`${key} is required`);
    }
  }

  // Check if the invoice exists
  const invoice = await Invoice.findByPk(invoiceId);
  if (!invoice) {
    throw new Error("Invoice not found");
  }

  // Check if the user exists and is a client and active
  const user = await User.findByPk(invoice.issuedTo);
  if (!user || user.role !== "client" || user.status !== "active") {
    throw new Error("User not found or not authorized to make payments");
  }

  // Intiate the payment process
  const response = await initiateSTKPush({
    amount: invoice.amount,
    phone: user.phone,
    invoiceId,
    accountReference: "Invoice Payment for " + invoiceId,
    transactionDesc: note || "Payment for invoice",
  });

  if (response.ResponseCode !== "0") {
    throw new Error(
      "Payment initiation failed: " + response.ResponseDescription
    );
  }

  // Create the payment record
  const payment = await Payment.create({
    invoiceId,
    paidBy: user.id,
    amount: invoice.amount,
    note: note || "Payment for invoice",
    reference: response.CheckoutRequestID,
    method: "mpesa",
  });

  return payment;
};

const handleStkCallback = async (callbackData) => {
  const { Body } = callbackData;

  const callback = Body?.stkCallback;
  if (!callback) return res.sendStatus(400);

  const resultCode = callback.ResultCode;
  const metadata = callback.CallbackMetadata;

  // Save to DB if ResultCode === 0 (Success)
  if (resultCode === 0) {
    const details = {};
    metadata?.Item?.forEach((item) => {
      details[item.Name] = item.Value;
    });

    console.log("✅ Payment Success:", details);
    // TODO: Save to Payment table
  } else {
    console.log("❌ Payment Failed", callback);
  }
};

export { createPayment, handleStkCallback };
