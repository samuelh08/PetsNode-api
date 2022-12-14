const { Model, fields, references, virtuals } = require('./model');
const { paginationParseParams } = require('../../../utils');
const { sortParseParams, sortCompactToStr } = require('../../../utils');
const { filterByNested } = require('../../../utils');
// const { populateToObject } = require('../../../utils');
const { Model: User } = require('../users/model');

const referencesNames = Object.getOwnPropertyNames(references);
const virtualsNames = Object.getOwnPropertyNames(virtuals);

exports.parentId = async (req, res, next) => {
  const { params = {} } = req;
  const { userId = null } = params;
  if (userId) {
    try {
      const doc = await User.findById(userId).exec();
      if (doc) {
        next();
      } else {
        const message = 'User not found';

        next({
          success: false,
          message,
          statusCode: 404,
          level: 'warn',
        });
      }
    } catch (error) {
      next(new Error(error));
    }
  } else {
    next();
  }
};

exports.id = async (req, res, next, id) => {
  const populate = [...referencesNames, ...virtualsNames].join(' ');
  try {
    const doc = await Model.findById(id).populate(populate).exec();
    if (!doc) {
      const message = `${Model.modelName} not found`;

      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    } else {
      req.doc = doc;
      next();
    }
  } catch (error) {
    next(new Error(error));
  }
};

exports.create = async (req, res, next) => {
  const { body = {}, params = {}, decoded = {}, file = {} } = req;
  const { _id = null } = decoded;
  if (_id) {
    body.userId = _id;
  }

  Object.assign(body, params, { picture: file.path });

  const document = new Model(body);

  try {
    const doc = await document.save();
    res.status(201);
    res.json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.all = async (req, res, next) => {
  const { query = {}, params = {} } = req;
  const { limit, page, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);
  const { filters, populate } = filterByNested(params, referencesNames);
  // const { populateVirtuals } = populateToObject(virtualsNames, virtuals);
  const {
    name = '',
    animal = '',
    sex = '',
    size = '',
    age = '',
    status = '',
  } = query;

  let completeFilters = filters;

  if (name !== '') {
    completeFilters = { ...completeFilters, name };
  }

  if (animal !== '') {
    completeFilters = { ...completeFilters, animal };
  }

  if (sex !== '' && sex !== 'Any') {
    completeFilters = { ...completeFilters, sex };
  }

  if (size !== '' && size !== 'Any') {
    completeFilters = { ...completeFilters, size };
  }

  if (age !== '' && age !== 'Any') {
    completeFilters = { ...completeFilters, age };
  }

  if (status !== '') {
    completeFilters = { ...completeFilters, status };
  }

  const all = Model.find(completeFilters)
    .sort(sortCompactToStr(sortBy, direction))
    .skip(skip)
    .limit(limit)
    .populate(populate)
    .populate(virtualsNames);
  const count = Model.countDocuments(completeFilters);

  try {
    const data = await Promise.all([all.exec(), count.exec()]);
    const [docs, total] = data;
    const pages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: docs,
      meta: {
        limit,
        skip,
        total,
        page,
        pages,
        sortBy,
        direction,
      },
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    success: true,
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { body = {}, doc = {}, params = {} } = req;

  Object.assign(doc, body, params);

  try {
    const updated = await doc.save();
    res.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;

  try {
    const removed = await doc.remove();
    res.json({
      success: true,
      data: removed,
    });
  } catch (error) {
    next(new Error(error));
  }
};
