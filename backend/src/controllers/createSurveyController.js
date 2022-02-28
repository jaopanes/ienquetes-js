module.exports = function handler(req, res) {
  try {
    const { title, initiatedAt, endedAt, options } = req.body;

    return res.status(201).json(req.body);
  } catch (error) {
    return res.status(500).json({ code: 'INTERNAL_1', message: error.message })
  }
}