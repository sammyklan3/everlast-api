import {
  createShippingCompany,
  updateShippingCompany,
  getAllShippingCompanies,
  getShippingCompanyById,
  deleteShippingCompany,
} from "../services/company.service.js";

// Create a new shipping company
async function createShippingCompanyController(req, res) {
  try {
    const shippingCompany = await createShippingCompany(req.body);
    res.status(201).json(shippingCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Get all shipping companies
async function getAllShippingCompaniesController(req, res) {
  try {
    const shippingCompanies = await getAllShippingCompanies();
    res.status(200).json(shippingCompanies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a shipping company by ID
async function getShippingCompanyByIdController(req, res) {
  try {
    const shippingCompany = await getShippingCompanyById(req.params.id);
    res.status(200).json(shippingCompany);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Update a shipping company
async function updateShippingCompanyController(req, res) {
  try {
    const shippingCompany = await updateShippingCompany(
      req.params.id,
      req.body
    );
    res.status(200).json(shippingCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
// Delete a shipping company
async function deleteShippingCompanyController(req, res) {
  try {
    const result = await deleteShippingCompany(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export {
  createShippingCompanyController,
  getAllShippingCompaniesController,
  getShippingCompanyByIdController,
  updateShippingCompanyController,
  deleteShippingCompanyController,
};
