exports.test = (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success',
    message: 'test',
  });
};
