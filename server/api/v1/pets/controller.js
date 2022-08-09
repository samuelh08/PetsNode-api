const Model = require('./model');

exports.create = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

  try {
    const doc = await document.save();
    res.status(201);
    res.json(doc);
  } catch (error) {
    next(new Error(error));
  }
};

exports.all = async (req, res, next) => {
  try {
    const docs = await Model.find({}).exec();
    res.json(docs);
  } catch (error) {
    next(new Error(error));
  }
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  res.json({
    id,
  });
};

exports.update = (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;
  res.json({
    id,
    body,
  });
};

exports.delete = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  res.json({
    id,
  });
};
