const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;

// parse requests in JSON format
app.use(express.json()); 
// parse requests in url format
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// TODO: sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => { 
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
