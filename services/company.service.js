import ShippingCompany from "../models/shippingCompany.js";

// Function to create a new shipping company
async function createShippingCompany({ name, contactInfo } = {}) {
  const requiredFields = { name };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new Error(`${key} is required`);
    }
  }

  // Check if the shipping company already exists
  const existingCompany = await ShippingCompany.findOne({ where: { name } });
  if (existingCompany)
    throw new Error("Shipping company with this name already exists");

  // Create the shipping company
  const shippingCompany = await ShippingCompany.create({
    name,
    contactInfo,
  });

  return shippingCompany;
}

// Function to get all shipping companies
async function getAllShippingCompanies() {
  const shippingCompanies = await ShippingCompany.findAll();
  return shippingCompanies;
}

// Function to get a shipping company by ID
async function getShippingCompanyById(id) {
  const shippingCompany = await ShippingCompany.findByPk(id);
  if (!shippingCompany) {
    throw new Error("Shipping company not found");
  }
  return shippingCompany;
}

// Function to update a shipping company
async function updateShippingCompany(id, { name, contactInfo } = {}) {
  const shippingCompany = await ShippingCompany.findByPk(id);
  if (!shippingCompany) {
    throw new Error("Shipping company not found");
  }

  // Update the shipping company
  shippingCompany.name = name || shippingCompany.name;
  shippingCompany.contactInfo = contactInfo || shippingCompany.contactInfo;

  await shippingCompany.save();
  return shippingCompany;
}

// Function to delete a shipping company
async function deleteShippingCompany(id) {
  if (!id) throw new Error("ID is required");
  const shippingCompany = await ShippingCompany.findByPk(id);
  if (!shippingCompany) {
    throw new Error("Shipping company not found");
  }

  // Delete the shipping company
  await shippingCompany.destroy();
  return { message: "Shipping company deleted successfully" };
}

export {
  createShippingCompany,
  getAllShippingCompanies,
  getShippingCompanyById,
  updateShippingCompany,
  deleteShippingCompany,
};
