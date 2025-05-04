import { Router } from 'express';
import { LineOfBestFitController } from '../controllers/lineOfBestFit';

const router = Router();

router.post('/check-answer', LineOfBestFitController.checkAnswer);
router.get('/generate-points', LineOfBestFitController.generatePoints);

export default router; 