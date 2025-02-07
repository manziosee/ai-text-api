const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const chatRoutes = require('./routes/chatRoutes');
const swaggerDocument = require('./utils/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
  message: 'Too many requests from this IP, please try again after a minute',
});

app.use(limiter);

// Routes
app.use('/api/chat', chatRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;