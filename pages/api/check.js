// /pages/api/check.js

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;  // اقرأ مفتاح API من .env.local

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // تحقق من أن method هو GET فقط
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { iccid } = req.query;

  if (!iccid) {
    return res.status(400).json({ error: 'ICCID parameter is required' });
  }

  try {
    // استدعاء API الخارجي مع مفتاح API و ICCID
    const apiResponse = await fetch(`https://api.esim-go.com/v2.4/esims/${iccid}/bundles`, {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY
      }
    });

    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: 'Failed to fetch data from external API' });
    }

    const data = await apiResponse.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
