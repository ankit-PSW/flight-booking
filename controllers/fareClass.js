import FareClass from '../models/fareClass.js';


export const createFareClass = async (req, res) => {
    try {
        const fareClass = await FareClass.create(req.body);
        console.log("fareClasses", fareClass);
        res.status(201).json(fareClass);
    } catch (error) {
            console.log("fareClass error", error);
        res.status(500).json({ message: error.parent?.detail || error.message });
    }
};


export const getAllFareClasses = async (req, res) => {
    try {
        const fareClasses = await FareClass.findAll();
        res.status(200).json(fareClasses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getFareClassById = async (req, res) => {
    try {
        const fareClass = await FareClass.findOne({
            where: { FareClassId: req.params.id }
        });

        if (!fareClass) {
            return res.status(404).json({ message: 'Fare class not found' });
        }

        res.status(200).json(fareClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateFareClassById = async (req, res) => {
    try {
        const fareClass = await FareClass.findOne({
            where: { FareClassId: req.params.id }
        });

        if (!fareClass) {
            return res.status(404).json({ message: 'Fare class not found' });
        }

        await fareClass.update(req.body);
        res.status(200).json(fareClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteFareClassById = async (req, res) => {
    try {
        const fareClass = await FareClass.findOne({
            where: { FareClassId: req.params.id }
        });

        if (!fareClass) {
            return res.status(404).json({ message: 'Fare class not found' });
        }

        await fareClass.destroy();
        res.status(200).json({ message: 'Fare class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
