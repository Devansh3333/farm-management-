exports.healthCheck = (req, res) => {
  res.json({ status: 'Mango Farm Backend is healthy' });
};
