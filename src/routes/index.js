const express = require('express');
const userRoutes = require('./userRoutes');

module.exports = (app) => {
  app.use(express.json(), userRoutes);

  app.get('/', (req, res) =>
    res.json({message: 'Welcome to users authentication'}),
  );
};
