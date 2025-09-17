import {getPricelist} from '../services/pricelistService.js'

export async function handlePricelist(req, res, next) {
  try {
    const data = await getPricelist(req.params.pricelistName);
    res.json(data);
  } catch (err) {
    console.error('Error in controller:', err);
    next(err); // przekazanie do globalnego handlera błędów
  }
};
