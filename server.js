const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
//dynamically set the port
const PORT = process.env.PORT || 3001;
const app = express();
//paths to route files
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//use route files
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);





app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
