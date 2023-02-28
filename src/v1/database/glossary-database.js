/*
 * Copyright (c) 2023. OctoSheep
 *
 * This file is part of Word Power.
 *
 * Word Power is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * Word Power is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with Word Power. If not, see <https://www.gnu.org/licenses/>.
 */

require('./connection');
const glossaryModel = require('../models/glossary');

const getGlossaries = () => {
  return new Promise((resolve, reject) => {
    return glossaryModel.find({}, {}, {}, (err, glossaries) => {
      if (err) {
        reject(err);
      } else {
        resolve(glossaries);
      }
    });
  });
};

const getGlossary = (glossaryName) => {
  return new Promise((resolve, reject) => {
    return glossaryModel.findOne({
      name: glossaryName,
    }, {}, {}, (err, glossary) => {
      if (err) {
        reject(err);
      } else {
        resolve(glossary);
      }
    });
  });
};

const createGlossary = (body) => {
  return new Promise((resolve, reject) => {
    const glossary = new glossaryModel({
      name:        body.name,
      description: body.description,
      vocabulary:  body.vocabulary,
    });
    return glossaryModel.create([glossary], {}, (err, glossary) => {
      if (err) {
        reject(err);
      } else {
        resolve(glossary);
      }
    });
  });
};

const updateGlossary = (glossaryName, body) => {
  return new Promise((resolve, reject) => {
    return glossaryModel.updateOne({
      name: glossaryName,
    }, {
      $set: {
        'name':        body.name,
        'description': body.description,
      },
    }, {}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const deleteGlossary = (glossaryName) => {
  return new Promise((resolve, reject) => {
    return glossaryModel.deleteOne({
      name: glossaryName,
    }, {}, (err, glossary) => {
      if (err) {
        reject(err);
      } else {
        resolve(glossary);
      }
    });
  });
};

const addWordId = (glossaryName, word) => {
  return new Promise((resolve, reject) => {
    return glossaryModel.updateOne({
      name: glossaryName,
    }, {
      $push: {
        'vocabularies': word._id,
      },
    }, {}, (err, glossary) => {
      if (err) {
        reject(err);
      } else {
        resolve(glossary);
      }
    });
  });
};

const deleteWordId = (glossaryName, word) => {
  return new Promise((resolve, reject) => {
    return glossaryModel.updateOne({
      name: glossaryName,
    }, {
      $pull: {
        'vocabularies': word._id,
      },
    }, {}, (err, glossary) => {
      if (err) {
        reject(err);
      } else {
        resolve(glossary);
      }
    });
  });
};

module.exports = {
  getGlossaries,
  getGlossary,
  createGlossary,
  updateGlossary,
  deleteGlossary,
  addWordId,
  deleteWordId,
};
