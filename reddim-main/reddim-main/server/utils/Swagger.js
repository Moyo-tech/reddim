const swaggerAutogen = require('swagger-autogen')();
const outPutFile = "./Documentation/SwaggerOutput.json";
const endPointsFiles = ['./routes/router.js'];
swaggerAutogen(outPutFile, endPointsFiles)
