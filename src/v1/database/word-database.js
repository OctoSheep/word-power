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
const wordModel = require('../models/word');

const getWords = (glossary, id, word) => {
  return new Promise((resolve, reject) => {
    if (id) {
      wordModel.find({
        '_id':      Object(id),
        'glossary': glossary.name,
      }, {}, {}).exec().then((words) => {
        resolve(words);
      }).catch((err) => {
        reject(err);
      });
    } else if (word) {
      wordModel.find({
        'word':     word,
        'glossary': glossary.name,
      }, {}, {}).exec().then((words) => {
        resolve(words);
      }).catch((err) => {
        reject(err);
      });
    } else {
      wordModel.find({
        'glossary': glossary.name,
      }, {}, {}).exec().then((words) => {
        resolve(words);
      }).catch((err) => {
        reject(err);
      });
    }
  });
};

const getWordById = (glossaryName, wordId) => {
  return new Promise((resolve, reject) => {
    wordModel.findOne({
      '_id':      Object(wordId),
      'glossary': glossaryName,
    }, {}, {}).exec().then((word) => {
      resolve(word);
    }).catch((err) => {
      reject(err);
    });
  });
};

const getWordByNameOrIndex = (glossaryName, wordName, wordIndex) => {
  return new Promise((resolve, reject) => {
    wordModel.findOne({
      $or: [
        {
          'word':     wordName,
          'glossary': glossaryName,
        }, {
          'index':    wordIndex,
          'glossary': glossaryName,
        }],
    }, {}, {}).exec().then((word) => {
      resolve(word);
    }).catch((err) => {
      reject(err);
    });
  });
};

const createWord = (glossaryName, body) => {
  return new Promise((resolve, reject) => {
    const word = new wordModel({
      glossary:    glossaryName,
      index:       body.index,
      word:        body.word,
      phonetic_us: body.phonetic_us,
      phonetic_uk: body.phonetic_uk,
      translation: body.translation,
    });
    wordModel.create([word], {}).then((words) => {
      resolve(words);
    }).catch((err) => {
      reject(err);
    });
  });
};

const createWords = (glossaryName, words) => {
  return new Promise((resolve, reject) => {
    const wordsToCreate = [];
    for (let i = 0; i < words.length; i++) {
      const word = new wordModel({
        glossary:    glossaryName,
        index:       words[i].index,
        word:        words[i].word,
        phonetic_us: words[i].phonetic_us,
        phonetic_uk: words[i].phonetic_uk,
        translation: words[i].translation,
      });
      wordsToCreate.push(word);
    }
    wordModel.create(wordsToCreate, {}).then((words) => {
      resolve(words.map(word => word._id));
    }).catch((err) => {
      reject(err);
    });
  });
};

const updateWord = (oldWord, body) => {
  return new Promise((resolve, reject) => {
    wordModel.findOneAndUpdate({
      _id:      oldWord._id,
      glossary: oldWord.glossary,
    }, {
      $set: {
        glossary:    body.glossary,
        index:       body.index,
        word:        body.word,
        phonetic_us: body.phonetic_us,
        phonetic_uk: body.phonetic_uk,
        translation: body.translation,
      },
    }, {
      new: true,
    }).exec().then((word) => {
      resolve(word);
    }).catch((err) => {
      reject(err);
    });
  });
};

const deleteWord = (glossaryName, wordId) => {
  return new Promise((resolve, reject) => {
    wordModel.findOneAndDelete({
      _id:      wordId,
      glossary: glossaryName,
    }, {}).exec().then((res) => {
      console.log(res);
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

const deleteGlossary = (glossaryName) => {
  return new Promise((resolve, reject) => {
    wordModel.deleteMany({
      glossary: glossaryName,
    }, {}).exec().then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

const updateGlossary = (oldGlossaryName, newGlossaryName) => {
  return new Promise((resolve, reject) => {
    wordModel.updateMany({
      glossary: oldGlossaryName,
    }, {
      $set: {
        glossary: newGlossaryName,
      },
    }, {}).exec().then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  getWords,
  getWordById,
  getWordByNameOrIndex,
  createWord,
  createWords,
  updateWord,
  deleteWord,
  deleteGlossary,
  updateGlossary,
};
