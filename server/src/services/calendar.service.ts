import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});


const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export const createEvent = async (summary: string, description: string, startTime: string, endTime: string, userEmail: string) => {
  const ownerEmails = process.env.OWNER_EMAILS?.split(',') || [];
  const attendees = [{ email: userEmail }, ...ownerEmails.map(email => ({ email }))];

  const event = {
    summary,
    description,
    start: {
      dateTime: startTime,
      timeZone: 'UTC',
    },
    end: {
      dateTime: endTime,
      timeZone: 'UTC',
    },
    attendees,
    conferenceData: {
      createRequest: {
        requestId: 'some-random-string',
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};
