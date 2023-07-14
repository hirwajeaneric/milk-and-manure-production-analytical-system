const PORT = process.env.PORT ?? 8000
const express = require('express');
const cors = require('cors');
const app = express();
const allRoutes = require('./routes/index'); 


app.use(cors());
app.use(express.json());

app.use('/api/v1/mmpas/', allRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));