const express = require('express');
require('express-async-errors');
const cors = require('cors');
const middleware = require('./utils/middleware');

const Routes = require("./routes/router")
const swaggerUI = require("swagger-ui-express")
const SwaggerOutput = require("./Documentation/SwaggerOutput.json")

const app = express();


app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(SwaggerOutput))
app.use('/api', Routes);


app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;