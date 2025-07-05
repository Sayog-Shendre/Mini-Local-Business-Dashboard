const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for simulation
const sampleRatings = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8];
const sampleReviewCounts = [45, 67, 89, 127, 156, 203, 278, 345];

const generateHeadlines = (name, location) => [
  `Why ${name} is ${location}'s Best Kept Secret in 2025`,
  `${name}: The ${location} Favorite That's Taking Over Social Media`,
  `How ${name} Became ${location}'s Most Talked About Spot`,
  `${name} - Where ${location} Locals Go for the Best Experience`,
  `The Rise of ${name}: ${location}'s Hidden Gem Revealed`,
  `${name} Sets New Standards in ${location} - Here's Why`,
  `From Local to Legendary: ${name}'s ${location} Success Story`,
  `${name}: The Ultimate ${location} Experience You Can't Miss`,
  `Breaking: ${name} Revolutionizes ${location}'s Business Scene`,
  `${name} - ${location}'s Premier Destination for Excellence`,
  `Why Everyone in ${location} is Talking About ${name}`,
  `${name} Dominates ${location} Market - Here's How`,
  `The ${name} Phenomenon: Taking ${location} by Storm`,
  `${name}: ${location}'s Crown Jewel of Innovation`
];

// Helper function to get random item from array
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

// POST /business-data
app.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body;
    
    // Validate input
    if (!name || !location) {
      return res.status(400).json({
        error: 'Both name and location are required'
      });
    }

    // Generate simulated business data
    const businessData = {
      rating: getRandomItem(sampleRatings),
      reviews: getRandomItem(sampleReviewCounts),
      headline: getRandomItem(generateHeadlines(name, location))
    };

    // Simulate API delay
    setTimeout(() => {
      res.json(businessData);
    }, 1000 + Math.random() * 1000); // 1-2 second delay

  } catch (error) {
    console.error('Error in /business-data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /regenerate-headline
app.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query;
    
    // Validate input
    if (!name || !location) {
      return res.status(400).json({
        error: 'Both name and location query parameters are required'
      });
    }

    // Generate new headline
    const headlines = generateHeadlines(name, location);
    const newHeadline = getRandomItem(headlines);

    // Simulate API delay
    setTimeout(() => {
      res.json({ headline: newHeadline });
    }, 500 + Math.random() * 500); // 0.5-1 second delay

  } catch (error) {
    console.error('Error in /regenerate-headline:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'GrowthProAI Backend API',
    version: '1.0.0',
    endpoints: {
      'POST /business-data': 'Get business data with rating, reviews, and SEO headline',
      'GET /regenerate-headline': 'Get a new SEO headline for the business',
      'GET /health': 'Health check endpoint'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GrowthProAI Backend running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}`);
});

module.exports = app;