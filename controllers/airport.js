import Airport from '../models/airport.js';


export const createAirport = async (req, res) => {
  try {
    const airport = await Airport.create(req.body);
    console.log("airports", airport);
    res.status(201).json(airport);
  } catch (error) {
      console.log("airport error", error);
    res.status(500).json({ message: error.parent?.detail || error.message });
  }
};


export const getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.findAll();
    res.status(200).json(airports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAirportById = async (req, res) => {
  try {
    const airport = await Airport.findOne({
      where: { AirportId: req.params.id }
    });

    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }

    res.status(200).json(airport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAirportById = async (req, res) => {
  try {
    const airport = await Airport.findOne({
      where: { AirportId: req.params.id }
    });

    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }

    await airport.update(req.body);
    res.status(200).json(airport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteAirportById = async (req, res) => {
  try {
    const airport = await Airport.findOne({
      where: { AirportId: req.params.id }
    });

    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }

    await airport.destroy();
    res.status(200).json({ message: 'Airport deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
