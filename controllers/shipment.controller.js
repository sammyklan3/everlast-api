import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
} from "../services/shipment.service.js";

async function createShipmentController(req, res) {
  try {
    const shipment = await createShipment(req.body);
    res
      .status(201)
      .json({ message: "Shipment created successfully", shipment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllShipmentsController(req, res) {
  try {
    const shipments = await getAllShipments();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getShipmentByIdController(req, res) {
  const { id } = req.params;
  try {
    const shipment = await getShipmentById(id);
    res.status(200).json(shipment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function updateShipmentController(req, res) {
  const { id } = req.params;
  try {
    const updatedShipment = await updateShipment(id, req.body);
    res
      .status(200)
      .json({ message: "Shipment updated successfully", updatedShipment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteShipmentController(req, res) {
  const { id } = req.params;
  try {
    const result = await deleteShipment(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export {
  createShipmentController,
  getAllShipmentsController,
  getShipmentByIdController,
  updateShipmentController,
  deleteShipmentController,
};
