const express = require("express");
const cors = require("cors");
const routes = require('./routes')

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.use('/v1',routes)


app.listen(port, () => {
    console.log(`Server runnin on port ${port} `);
});
