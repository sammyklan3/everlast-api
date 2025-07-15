import Invoice from "../models/invoice.js";
import User from "../models/user.js";
import Shipment from "../models/shipment.js";

// Create a new invoice record
const createInvoice = async ({
  shipmentId,
  amount,
  currency = "USD",
  dueDate,
  notes,
} = {}) => {
  const requiredFields = { shipmentId, amount, dueDate };
  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new Error(`${key} is required`);
    }
  }

  // Check if the shipment exists
  const shipment = await Shipment.findByPk(shipmentId);
  if (!shipment) {
    throw new Error("Shipment not found");
  }

  //   Check if an invoice already exists for this shipment
  const existingInvoice = await Invoice.findOne({
    where: { shipmentId },
  });
  if (existingInvoice) {
    throw new Error("An invoice for this shipment already exists");
  }

  // Check if the user exists and is a client
  const user = await User.findByPk(shipment.clientId);
  if (!user || user.role !== "client") {
    throw new Error("User not found or not authorized to receive invoices");
  }

  // Create the invoice record
  const invoice = await Invoice.create({
    shipmentId,
    issuedTo: user.id,
    amount,
    currency,
    dueDate,
    notes,
  });

  return invoice;
};

export { createInvoice };
