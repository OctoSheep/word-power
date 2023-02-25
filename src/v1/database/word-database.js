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

const getWords = (glossary) => {
  return new Promise((resolve, reject) => {
    return wordModel.find({'glossary': glossary.name}, (err, words) => {
      if (err) {
        reject(err);
      } else {
        resolve(words);
      }
    });
  });
};

const getWord = (glossaryName, wordId) => {
  return new Promise((resolve, reject) => {
    return wordModel.findOne({
      '_id':      Object(wordId),
      'glossary': glossaryName,
    }, (err, word) => {
      if (err) {
        reject(err);
      } else {
        resolve(word);
      }
    });
  });
};

const createWord = (glossaryName, body) => {
  return new Promise((resolve, reject) => {
    const word = new wordModel({
      word:        body.word,
      index:       body.index,
      phonetic_us: body.phonetic_us,
      phonetic_uk: body.phonetic_uk,
      translation: body.translation,
      glossary:    glossaryName,
    });
    return wordModel.create(word, (err, word) => {
      if (err) {
        reject(err);
      } else {
        resolve(word);
      }
    });
  });
};

const updateWord = (oldWord, body) => {
  return new Promise((resolve, reject) => {
    return wordModel.findOneAndUpdate({
      _id:      oldWord._id,
      glossary: oldWord.glossary,
    }, {
      $set: {
        glossary:    body.glossary || oldWord.glossary,
        word:        body.word || oldWord.word,
        index:       body.index || oldWord.index,
        phonetic_us: body.phonetic_us || oldWord.phonetic_us,
        phonetic_uk: body.phonetic_uk || oldWord.phonetic_uk,
        translation: body.translation || oldWord.translation,
      },
    }, {
      returnOriginal: false,
    }, (err, word) => {
      if (err) {
        reject(err);
      } else {
        resolve(word);
      }
    });
  });
};

const deleteWord = (glossaryName, word) => {
  return new Promise((resolve, reject) => {
    return wordModel.findOneAndDelete({
      _id:      word._id,
      glossary: glossaryName,
    }, (err, word) => {
      if (err) {
        reject(err);
      } else {
        resolve(word);
      }
    });
  });
};

module.exports = {
  getWords,
  getWord,
  createWord,
  updateWord,
  deleteWord,
};
