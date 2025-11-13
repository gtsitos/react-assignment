module.exports = (req, res, next) => {
  if (Math.random() < 0.1) {
    return res.status(500).json({ error: 'Server error' });
  }

  const delay = Math.random() < 0.2 ? 3000 : 0;
  setTimeout(next, delay);
};

