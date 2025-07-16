import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
} from "../services/invoice.service.js";

// Create a new invoice
async function createInvoiceController(req, res) {
  try {
    const invoice = await createInvoice(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all invoices
async function getAllInvoicesController(req, res) {
  try {
    const invoices = await getAllInvoices();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get invoice by ID
async function getInvoiceByIdController(req, res) {
  try {
    const invoice = await getInvoiceById(req.params.id);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export {
  createInvoiceController,
  getAllInvoicesController,
  getInvoiceByIdController,
};
