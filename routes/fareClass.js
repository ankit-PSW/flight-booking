import express from 'express';

import {
    createFareClass,
    getAllFareClasses,
    getFareClassById,
    updateFareClassById,
    deleteFareClassById
} from '../controllers/fareClass.js';

const router = express.Router();

router.post('/', createFareClass);
router.get('/', getAllFareClasses);
router.get('/:id', getFareClassById);
router.put('/:id', updateFareClassById);
router.delete('/:id', deleteFareClassById);

export default router;
