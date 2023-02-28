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
    return glossaryModel.find({}, {}, {}).exec().then((glossaries) => {
      resolve(glossaries);
    }).catch((err) => {
      reject(err);
    });
  });
};

const getGlossary = (glossaryName) => {
  return new Promise((resolve, reject) => {
    return glossaryModel.findOne({
      name: glossaryName,
    }, {}, {}).exec().then((glossary) => {
      resolve(glossary);
    }).catch((err) => {
      reject(err);
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
    return glossaryModel.create([glossary], {}).then((glossary) => {
      resolve(glossary);
    }).catch((err) => {
      reject(err);
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
    }, {}).exec().then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

const deleteGlossary = (glossaryName) => {
  return new Promise((resolve, reject) => {
    return glossaryModel.deleteOne({
      name: glossaryName,
    }, {}).exec().then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
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
    }, {}).exec().then((glossary) => {
      resolve(glossary);
    }).catch((err) => {
      reject(err);
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
    }, {}).exec().then((glossary) => {
      resolve(glossary);
    }).catch((err) => {
      reject(err);
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
