exports.userGet = async (req, res) => {
  try {
    const user = await res.json('user route');
  } catch (err) {
    res.status(500).json(err);
  }
};
