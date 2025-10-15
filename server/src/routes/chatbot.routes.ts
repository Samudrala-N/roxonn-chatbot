import { Router, Request, Response } from 'express';
import { body } from 'express-validator';

const router = Router();

import { handleMessage, handlePricingAnalysis, handleScheduleMeeting } from '../controllers/chatbot.controller';

router.post(
  '/message',
  [body('message').notEmpty().withMessage('Message is required')],
  handleMessage
);

router.post(
  '/analyze-pricing',
  [body('topic').notEmpty().withMessage('Project topic is required')],
  handlePricingAnalysis
);

router.post(
  '/schedule-meeting',
  [
    body('summary').notEmpty(),
    body('description').notEmpty(),
    body('startTime').isISO8601(),
    body('endTime').isISO8601(),
    body('email').isEmail(),
  ],
  handleScheduleMeeting
);

router.post('/session', (req: Request, res: Response) => {
  res.json({ message: 'Session created' });
});

export default router;
