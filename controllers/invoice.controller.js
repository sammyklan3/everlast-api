import { createInvoice } from "../services/invoice.service.js";

// Create a new invoice
async function createInvoiceController(req, res) {
  try {
    const invoice = await createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export { createInvoiceController };
