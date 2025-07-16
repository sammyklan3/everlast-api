import User from "../models/user.js";
import Shipment from "../models/shipment.js";
import ShippingCompany from "../models/shippingCompany.js";
import Port from "../models/port.js";
import Invoice from "../models/invoice.js";

// Function to create a new shipment
async function createShipment({
  trackingNumber,
  description,
  origin,
  destination,
  portOfEntryId,
  shippingCompanyId,
  weight,
  weightUnit,
  status,
  clientId,
  assignedTo,
  expectedDeliveryDate,
  actualDeliveryDate,
  notes,
} = {}) {
  const requiredFields = {
    trackingNumber,
    origin,
    destination,
    description,
    weight,
    clientId,
    shippingCompanyId,
  };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      throw new Error(`${key} is required`);
    }
  }

  // Check if the client exists and has client role
  const client = await User.findOne({
    where: { id: clientId, role: "client" },
  });
  if (!client) {
    throw new Error("Client does not exist or is not a valid client");
  }

  // Check if port exists (optional if portOfEntryId is provided)
  let port = null;
  if (portOfEntryId) {
    port = await Port.findByPk(portOfEntryId);
    if (!port) {
      throw new Error("Port of entry not found");
    }
  }

  // Check if shipping company exists
  let shippingCompany = null;
  if (shippingCompanyId) {
    shippingCompany = await ShippingCompany.findByPk(shippingCompanyId);
    if (!shippingCompany) {
      throw new Error("Shipping company not found");
    }
  }

  // Check if assigned staff exists and has a staff/admin role (optional)
  if (assignedTo) {
    const staff = await User.findOne({
      where: {
        id: assignedTo,
        role: ["staff", "admin"],
      },
    });
    if (!staff) {
      throw new Error("Assigned user not found or is not authorized");
    }
  }

  // Check if a shipment with the same tracking number already exists
  const existingShipment = await Shipment.findOne({
    where: { trackingNumber },
  });
  if (existingShipment)
    throw new Error("Shipment with this tracking number already exists");

  // Create the shipment
  const shipment = await Shipment.create({
    trackingNumber,
    description,
    origin,
    destination,
    portOfEntryId,
    shippingCompanyId,
    weight,
    weightUnit,
    status,
    clientId,
    assignedTo,
    expectedDeliveryDate,
    actualDeliveryDate,
    notes,
  });

  return shipment;
}

// Function to get all shipments
async function getAllShipments() {
  const shipments = await Shipment.findAll({
    include: [
      {
        model: User,
        as: "client",
        attributes: { exclude: ["password"] },
      },
      {
        model: User,
        as: "agent",
        attributes: { exclude: ["password"] },
      },
      {
        model: ShippingCompany,
        as: "shippingCompany",
      },
      {
        model: Invoice,
        as: "invoice",
      },
      {
        model: Port,
        as: "entryPort",
      },
    ],
  });

  return shipments;
}

// Get shipment by ID
async function getShipmentById(id) {
  if (!id) throw new Error("Shipment ID is required");

  const shipment = await Shipment.findByPk(id, {
    include: [
      {
        model: User,
        as: "client",
        attributes: { exclude: ["password"] },
      },
      {
        model: User,
        as: "agent",
        attributes: { exclude: ["password"] },
      },
      {
        model: Invoice,
        as: "invoice",
      },
      {
        model: ShippingCompany,
        as: "shippingCompany",
      },
      {
        model: Port,
        as: "entryPort",
      },
    ],
  });

  if (!shipment) {
    throw new Error("Shipment not found");
  }

  return shipment;
}

// Update shipment by ID
async function updateShipment(id, updates) {
  if (!id) throw new Error("Shipment ID is required");

  console.log("updates:", updates);

  const shipment = await Shipment.findByPk(id);
  if (!shipment) {
    throw new Error("Shipment not found");
  }

  // Check if the shipment is not pending or cancelled
  if (shipment.status !== "pending" && shipment.status !== "cancelled") {
    throw new Error(
      "Shipment cannot be updated unless it is pending or cancelled"
    );
  }

  // Check if portOfEntryId is provided and if the port exists
  if (updates.portOfEntryId) {
    const port = await Port.findByPk(updates.portOfEntryId);
    if (!port) {
      throw new Error("Port of entry not found");
    }
  }

  // Check if assignedTo is provided and if the user exists
  if (updates.assignedTo) {
    const staff = await User.findOne({
      where: {
        id: updates.assignedTo,
        role: ["staff", "admin"],
      },
    });
    if (!staff) {
      throw new Error("Assigned user not found or is not authorized");
    }
  }

  // Check if the updates include a valid shipping company
  if (updates.shippingCompanyId) {
    const shippingCompany = await ShippingCompany.findByPk(
      updates.shippingCompanyId
    );
    if (!shippingCompany) {
      throw new Error("Shipping company not found");
    }
  }

  // Update the shipment with the provided updates
  await shipment.update(updates);

  return shipment;
}

// Delete shipment by ID
async function deleteShipment(id) {
  if (!id) throw new Error("Shipment ID is required");

  const shipment = await Shipment.findByPk(id);
  if (!shipment) {
    throw new Error("Shipment not found");
  }

  // Check if the shipment is not pending or cancelled
  if (shipment.status !== "pending" && shipment.status !== "cancelled") {
    throw new Error(
      "Shipment cannot be deleted unless it is pending or cancelled"
    );
  }

  await shipment.destroy();
  return { message: "Shipment deleted successfully" };
}

export {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
};
