import { Router } from 'express';
import { WorkshopController } from '../controllers/WorkshopController';

const router = Router();
const workshopController = WorkshopController.getInstance();

// Get all workshops
router.get('/', workshopController.getAllWorkshops.bind(workshopController));

// Create workshops from spots
router.post('/create-from-spots', workshopController.createWorkshopsFromSpots.bind(workshopController));

// Book a workshop
router.post('/:workshopId/book', workshopController.bookWorkshop.bind(workshopController));

export default router; 