import axios from 'axios';

const API_URL = 'http://localhost:3001/api/chat';

export const sendMessage = async (message: string) => {
  try {
    const response = await axios.post(`${API_URL}/message`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const analyzePricing = async (topic: string) => {
  try {
    const response = await axios.post(`${API_URL}/analyze-pricing`, { topic });
    return response.data;
  } catch (error) {
    console.error('Error analyzing pricing:', error);
    throw error;
  }
};

export const scheduleMeeting = async (summary: string, description: string, startTime: string, endTime: string, email: string) => {
  try {
    const response = await axios.post(`${API_URL}/schedule-meeting`, { summary, description, startTime, endTime, email });
    return response.data;
  } catch (error) {
    console.error('Error scheduling meeting:', error);
    throw error;
  }
};
