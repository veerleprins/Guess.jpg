// Externals
require("dotenv").config();
const fetch = require("node-fetch");

const fetchData = async (endpoint, params) => {
  try {
    const URL = `https://api.unsplash.com/${endpoint}?client_id=${process.env.KEY}&${params}&page=1`;
    const response = await fetch(URL);
    return await response.json();
  } catch (err) {
    next(err);
  }
};

module.exports = fetchData;
