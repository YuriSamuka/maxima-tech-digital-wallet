const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') })

const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');

const app = express();
const PORT = 3500;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use (routes);

app.listen ( PORT,  ()=> {
    console.log("Listening to port: " + PORT);
});