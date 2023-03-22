const express = require('express');
const bodyParser = require('body-parser');
const FormRoutes = require('./routes/FormRoutes');
const ResponseRoutes = require('./routes/ResponseRoutes');
const app = express();


app.use(bodyParser.json());
app.use('/survey', FormRoutes);
app.use('/response',ResponseRoutes);

const PORT =5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

