require('dotenv').config()
const express = require('express');






const app = express();






app.use(express.json());


app.use('/user', user);



// Activates app.js
app.listen(process.env.PORT, () => {
console.log(`App is listening on port ${process.env.PORT}`);
})
