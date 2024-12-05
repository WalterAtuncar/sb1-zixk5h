const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false // Required for Swagger UI to work properly
}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve Swagger UI at both paths
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/swagger', swaggerUi.serve);
app.get('/swagger/index.html', (req, res) => {
  res.send(swaggerUi.generateHTML(swaggerSpec));
});

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at:`);
  console.log(`- http://localhost:${PORT}/api-docs`);
  console.log(`- http://localhost:${PORT}/swagger/index.html`);
});

module.exports = app;