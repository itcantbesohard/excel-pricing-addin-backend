
module.exports = (req, res, next) => {
  if (req.headers['x-addin-key'] !== process.env.ADDIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
