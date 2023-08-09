require('dotenv').config();
require('express-async-errors');
const PORT = process.env.PORT || 5050
const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS;
const express = require('express');
const cors = require('cors');
const app = express();
const allRoutes = require('./routes/index'); 
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const corsOptions = {
    origin: ['http://192.168.43.16:4040', 'http://127.0.0.1:4040', CLIENT_ADDRESS],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());

app.use('/api/v1/mmpas/', allRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));