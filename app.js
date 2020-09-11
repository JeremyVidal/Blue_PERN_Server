require('dotenv').config()
const express = require('express');






const app = express(); 

const sequelize = require('./db');

sequelize.sync();



app.use(express.json());

app.use(require('./middleware/validate-session'));


// Activates app.js
app.listen(process.env.PORT, () => {
console.log(`App is listening on port ${process.env.PORT}`);
})
