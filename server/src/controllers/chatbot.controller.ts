import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import AIService from '../services/ai.service';
import { google } from 'googleapis';
import { createEvent } from '../services/calendar.service';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

export const handleAuth = (req: Request, res: Response) => {
  const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });

  res.redirect(url);
};

export const handleOAuth2Callback = async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // In a real app, you'd save the refresh_token to a database
    console.log('Refresh Token:', tokens.refresh_token);

    res.send('Authentication successful! You can close this tab.');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Authentication failed.');
  }
};

export const handleMessage = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message } = req.body;

  try {
    const botResponse = await AIService.generateResponseMessage(message, {});
    res.json({ reply: botResponse });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get a response from the bot' });
  }
};

export const handlePricingAnalysis = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { topic } = req.body;

  try {
    const pricingData = await AIService.analyzePricingFromMarketplaces(topic);
    res.json(pricingData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze pricing' });
  }
};

export const handleScheduleMeeting = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { summary, description, startTime, endTime, email } = req.body;

  try {
    const event = await createEvent(summary, description, startTime, endTime, email);
    res.json({ message: 'Meeting scheduled successfully', data: event });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule meeting' });
  }
};
