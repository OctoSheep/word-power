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

const wordService = require('../services/word-service');

const getWords = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  const word         = req.query['word'];
  const id           = req.query['id'];

  wordService.getWords(glossaryName, word, id).then((resolve) => {
    // console.log(resolve);
    if (resolve === null) {
      res.status(404).send({
        status:  404,
        message: 'Glossary not found.',
        data:    null,
      });
    } else if (resolve.length === 0) {
      res.status(200).send({
        status:  200,
        message: 'No words found in ' + glossaryName + '.',
        data:    null,
      });
    } else {
      res.status(200).send({
        status:  200,
        message: 'Get all words from ' + glossaryName + '.',
        data:    resolve,
      });
    }
  }).catch((reject) => {
    // console.log(reject);
    res.status(500).send({
      status:  500,
      message: 'Internal server error.',
      data:    reject,
    });
  });
};

const createWord = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  const body         = req.body;

  wordService.createWord(glossaryName, body).then((resolve) => {
    if (resolve === null) {
      res.status(404).send({
        status:  404,
        message: 'Glossary not found.',
        data:    null,
      });
    } else {
      res.status(200).send({
        status:  200,
        message: 'Word added to ' + glossaryName + '.',
        data:    resolve,
      });
    }
  }).catch((reject) => {
    // console.log(reject);
    if (reject.code === 11000) {
      res.status(409).send({
        status:  409,
        message: 'Word already exists in ' + glossaryName + '.',
        data:    null,
      });
    } else {
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    reject,
      });
    }
  });
};

const updateWord = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  const wordId       = req.params['wordId'];
  const body         = req.body;

  if (body === undefined || body === null) {
    res.status(400).send({
      status:  400,
      message: 'Body is required.',
      data:    null,
    });
  } else if (body.glossary !== undefined && body.glossary !== null
             && typeof body.glossary !== 'string') {
    res.status(400).send({
      status:  400,
      message: 'Glossary must be a string.',
      data:    null,
    });
  } else if (body.word !== undefined && body.word !== null
             && typeof body.word !== 'string') {
    res.status(400).send({
      status:  400,
      message: 'Word must be a string.',
      data:    null,
    });
  } else if (body.index !== undefined && body.index !== null
             && typeof body.index !== 'number') {
    res.status(400).send({
      status:  400,
      message: 'Index must be a number.',
      data:    null,
    });
  } else if (body.phonetic_us !== undefined && body.phonetic_us !== null
             && typeof body.phonetic_us !== 'string') {
    res.status(400).send({
      status:  400,
      message: 'Phonetic US must be a string.',
      data:    null,
    });
  } else if (body.phonetic_uk !== undefined && body.phonetic_uk !== null
             && typeof body.phonetic_uk !== 'string') {
    res.status(400).send({
      status:  400,
      message: 'Phonetic UK must be a string.',
      data:    null,
    });
  } else if (body.transaction !== undefined && body.transaction !== null
             && Array.isArray(body.transaction) === true) {
    res.status(400).send({
      status:  400,
      message: 'Transaction must be an array.',
      data:    null,
    });
  } else {
    wordService.updateWord(glossaryName, wordId, body).then((resolve) => {
      // console.log(resolve);
      if (typeof resolve === 'string') {
        res.status(404).send({
          status:  404,
          message: resolve,
          data:    null,
        });
      } else {
        res.status(200).send({
          status:  200,
          message: 'Word updated in ' + glossaryName + '.',
          data:    resolve,
        });
      }
    }).catch((reject) => {
      // console.log(reject);
      if (reject.code === 11000) {
        res.status(409).send({
          status:  409,
          message: 'Word and index already exists in ' + glossaryName + '.',
          data:    null,
        });
      } else {
        res.status(500).send({
          status:  500,
          message: 'Internal server error.',
          data:    reject,
        });
      }
    });
  }
};

const deleteWord = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  const wordId       = req.params['wordId'];

  wordService.deleteWord(glossaryName, wordId).then((resolve) => {
    // console.log(resolve);
    if (typeof resolve === 'string') {
      res.status(404).send({
        status:  404,
        message: resolve,
        data:    null,
      });
    } else {
      res.status(200).send({
        status:  200,
        message: 'Word deleted from ' + glossaryName + '.',
        data:    resolve,
      });
    }
  }).catch((reject) => {
    // console.log(reject);
    res.status(500).send({
      status:  500,
      message: 'Internal server error.',
      data:    reject,
    });
  });
};

module.exports = {
  getWords,
  createWord,
  updateWord,
  deleteWord,
};
