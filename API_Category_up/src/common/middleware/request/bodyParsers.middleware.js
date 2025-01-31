const express = require("express");

const setupBodyParsers = (app, options = {}) => {
  const {
    jsonLimit = "10kb",
    urlencodedLimit = "10kb",
    urlencodedExtended = true,
  } = options;

  app.use(express.json({ limit: jsonLimit }));
  app.use(
    express.urlencoded({ extended: urlencodedExtended, limit: urlencodedLimit })
  );
};

module.exports = setupBodyParsers;
