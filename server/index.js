require('dotenv').config();
require('express-async-errors');
const PORT = process.env.PORT || 8000
const express = require('express');
const cors = require('cors');
const app = express();
const allRoutes = require('./routes/index'); 
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(cors());
app.use(express.json());

app.use('/api/v1/mmpas/', allRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));