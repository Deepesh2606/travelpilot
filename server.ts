import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Gemini structured generation schema
const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    destination: { type: Type.STRING, description: "City and country, e.g. Tokyo, Japan" },
    tagline: { type: Type.STRING, description: "Short evocative scrapbook subtitle" },
    summary: { type: Type.STRING, description: "A vivid 2-3 paragraph scrapbook narrative summary describing the trip highlights, sights, scents, and experiences" },
    travelers: { type: Type.STRING, description: "e.g. Solo Explorer, Couple, Family of 4, Friends" },
    totalEstimatedCost: { type: Type.STRING, description: "Formatted total estimate, e.g. $1,450 or ¥180,000" },
    interests: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 tags like Culture, Culinary, Hidden Gems, Photography"
    },
    quote: {
      type: Type.OBJECT,
      properties: {
        text: { type: Type.STRING },
        author: { type: Type.STRING }
      },
      required: ["text", "author"]
    },
    photoKeywords: { type: Type.STRING, description: "Keyword for Unsplash photos, e.g. tokyo street cherry blossom" },
    budget: {
      type: Type.OBJECT,
      properties: {
        accommodation: { type: Type.STRING },
        food: { type: Type.STRING },
        activities: { type: Type.STRING },
        transport: { type: Type.STRING }
      },
      required: ["accommodation", "food", "activities", "transport"]
    },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          theme: { type: Type.STRING, description: "Day theme, e.g. Temples, Neon & Ramen" },
          morning: {
            type: Type.OBJECT,
            properties: {
              activity: { type: Type.STRING },
              description: { type: Type.STRING },
              cost: { type: Type.STRING }
            },
            required: ["activity", "description", "cost"]
          },
          afternoon: {
            type: Type.OBJECT,
            properties: {
              activity: { type: Type.STRING },
              description: { type: Type.STRING },
              cost: { type: Type.STRING }
            },
            required: ["activity", "description", "cost"]
          },
          evening: {
            type: Type.OBJECT,
            properties: {
              activity: { type: Type.STRING },
              description: { type: Type.STRING },
              cost: { type: Type.STRING }
            },
            required: ["activity", "description", "cost"]
          }
        },
        required: ["day", "theme", "morning", "afternoon", "evening"]
      }
    },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "4-6 practical, insider scrapbook travel tips"
    },
    handwrittenNotes: {
      type: Type.STRING,
      description: "A short personal traveler note or memory prompt"
    }
  },
  required: ["destination", "summary", "travelers", "totalEstimatedCost", "interests", "budget", "days", "tips"]
};

app.post('/api/generate-itinerary', async (req, res) => {
  try {
    const { destination, days = 3, travelers = 'Couple', budgetTier = 'Moderate', interests = 'Food & Culture', specialRequests = '' } = req.body;

    if (!destination) {
      return res.status(400).json({ error: 'Destination is required.' });
    }

    const prompt = `Create an authentic, culturally rich, beautifully detailed travel itinerary for:
Destination: ${destination}
Duration: ${days} days
Travelers: ${travelers}
Budget Level: ${budgetTier}
Interests/Vibe: ${interests}
Special Notes/Wishes: ${specialRequests || 'None'}

Make it feel like a cherished traveler's scrapbook journal. Provide specific real-world landmark names, neighborhood gems, local food specialties, estimated local currency/dollar costs, practical tips, and evocative themes for each day.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert travel journalist, cartographer, and scrapbook curator. Generate structured travel itineraries with realistic timing, authentic local food recommendations, practical costs, and evocative descriptions.',
        responseMimeType: 'application/json',
        responseSchema: itinerarySchema,
        temperature: 0.7,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('No response generated by Gemini');
    }

    const parsedData = JSON.parse(responseText);
    return res.json({ itinerary: parsedData });
  } catch (err: any) {
    console.error('Gemini generation error:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to generate itinerary. Please try again.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
