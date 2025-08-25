const pricelistService = require('../services/pricelistService');

exports.getPricelist = async (req, res, next) => {
  try {
    const data = await pricelistService.getPricelist();
    res.json(data);
  } catch (err) {
    console.error('Error in controller:', err);
    next(err); // przekazanie do globalnego handlera błędów
  }
};
