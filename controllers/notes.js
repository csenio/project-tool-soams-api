const { get, isString, isNaN } = require('lodash');

const Note = require('../models/note');
const { AppError, sendJSONresponse } = require('../utils');

const notesSaveOne = note =>
  new Promise((resolve, reject) => {
    const requiredFields = ['title', 'content'];

    const invalidField = requiredFields.find(field => {
      const value = note[field];
      return !value || !isString(value);
    });

    if (invalidField) {
      reject(new AppError(400, `The field '${invalidField}' is required.`));
      return;
    }

    note.save(err => {
      if (err) {
        console.log('ERROR', err);
        reject(new AppError(500, 'Failed to save note.'));
        return;
      }

      resolve();
    });
  });

const notesFindOne = id =>
  new Promise((resolve, reject) => {
    Note.findById(id, (err, note) => {
      if (err) {
        reject(new AppError(500, 'Failed to find note.'));
        return;
      }

      if (!note) {
        reject(new AppError(404, 'Note not found.'));
        return;
      }

      resolve(note);
    });
  });

module.exports.notesReadMany = async (req, res, next) => {
  try {
    const skip = parseInt(get(req, 'query.skip', 0), 10);
    const limit = parseInt(get(req, 'query.limit', 15), 10);

    if (isNaN(skip) || isNaN(limit)) {
      throw new AppError(400, 'Invalid query parameters.');
    }

    const notes = await Note.find({}, null, {
      skip,
      limit,
      sort: { updatedAt: -1 }
    });

    sendJSONresponse(res, 200, { notes });
  } catch (err) {
    next(err);
  }
};

module.exports.notesCreateOne = async (req, res, next) => {
  try {
    const note = new Note({
      title: get(req, 'body.title'),
      content: get(req, 'body.content'),
      column: get(req, 'body.column')
    });

    await notesSaveOne(note);

    sendJSONresponse(res, 201, { note });
  } catch (err) {
    next(err);
  }
};

module.exports.notesUpdateOne = async (req, res, next) => {
  try {
    console.log('UPDA');
    const note = await notesFindOne(req.params.id);

    note.title = get(req, 'body.title', note.title);
    note.content = get(req, 'body.content', note.content);
    note.column = get(req, 'body.column', note.column);

    await notesSaveOne(note);

    sendJSONresponse(res, 204);
  } catch (err) {
    next(err);
  }
};

module.exports.notesDeleteOne = async (req, res, next) => {
  try {
    const note = await notesFindOne(req.params.id);

    await note.remove();

    sendJSONresponse(res, 204);
  } catch (err) {
    next(err);
  }
};
