import OpenAI from 'openai';

class AIService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.AZURE_OPENAI_ENDPOINT || !process.env.AZURE_OPENAI_API_KEY) {
      throw new Error("Azure OpenAI environment variables not set");
    }

    this.openai = new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      baseURL: process.env.AZURE_OPENAI_ENDPOINT,
      defaultQuery: { 'api-version': '2024-02-01' },
      defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY },
    });
  }

  async analyzePricingFromMarketplaces(projectTopic: string): Promise<any> {
    const prompt = `
      You are a pricing analyst for freelance marketplaces.
      Analyze typical pricing for the following project on Fiverr and Upwork:
      Project: "${projectTopic}"

      Provide the following information in a pure JSON object format, with no extra text or explanations outside of the JSON structure.
      
      {
        "fiverrRange": { "min": number, "max": number },
        "upworkRange": { "min": number, "max": number },
        "averageMarketRate": number,
        "roxonnEstimate": number, // This should be 30% less than the averageMarketRate
        "explanation": "A brief explanation of factors affecting the price."
      }
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const text = response.choices[0].message.content;
      if (!text) {
        throw new Error('No content in response from Azure OpenAI');
      }
      
      // Clean the response to ensure it's valid JSON
      const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error analyzing pricing with Azure OpenAI:', error);
      throw new Error('Failed to analyze pricing');
    }
  }

  async generateResponseMessage(userMessage: string, context: any): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        return 'Sorry, I am having trouble connecting to the AI service.';
      }
      return content;
    } catch (error) {
      console.error('Error generating response from Azure OpenAI:', error);
      return 'Sorry, I am having trouble connecting to the AI service.';
    }
  }
}

export default new AIService();
