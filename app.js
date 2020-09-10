require('dotenv').config()
const express = require('express');






const app = express(); 






app.use(express.json());






// Activates app.js
app.listen(process.env.PORT, () => {
console.log(`App is lisenting on port ${process.env.PORT}`);
})
