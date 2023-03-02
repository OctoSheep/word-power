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

  if (id !== undefined && id !== null && id.length !== 24) {
    res.status(400).send({
      status:  400,
      message: 'Word ID is invalid.',
      data:    null,
    });
  } else {
    wordService.getWords(glossaryName, id, word).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'Get all matching words in ' + glossaryName + '.',
        data:    resolve,
      });
    }).catch((reject) => {
      // console.log(reject);
      if (typeof reject === 'object') {
        res.status(reject.status).send({
          status:  reject.status,
          message: reject.message,
          data:    reject.data,
        });
      } else {
        res.status(500).send({
          status:  500,
          message: 'Internal server error.',
          data:    null,
        });
      }
    });
  }
};

const createWord = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  const body         = req.body;

  console.log(body);

  if (body === undefined || body === null) {
    res.status(400).send({
      status:  400,
      message: 'Body is required.',
      data:    null,
    });
  } else if (body.index === undefined || body.index === null
             || typeof body.index !== 'number' || body.index <= 0) {
    res.status(400).send({
      status:  400,
      message: 'Index is required and must be a number greater than 0.',
      data:    null,
    });
  } else if (body.word === undefined || body.word === null
             || typeof body.word !== 'string' || body.word.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'Word is required and must be a string.',
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
  } else if (body.translation === undefined || body.translation === null
             || Array.isArray(body.translation) === false) {
    res.status(400).send({
      status:  400,
      message: 'Translation is required and must be an array.',
      data:    null,
    });
  } else if (Array.isArray(body.translation)) {
    for (const trans of body.translation) {
      if (trans.part_of_speech === undefined || trans.part_of_speech === null
          || typeof trans.part_of_speech !== 'string') {
        res.status(400).send({
          status:  400,
          message: 'Translation\'s part of speech is required and must be a string.',
          data:    null,
        });
      } else if (trans.definition === undefined || trans.definition === null
                 || typeof trans.definition !== 'string') {
        res.status(400).send({
          status:  400,
          message: 'Translation\'s definition is required and must be a string.',
          data:    null,
        });
      }
    }
  } else {
    wordService.createWord(glossaryName, body).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'Word added to ' + glossaryName + '.',
        data:    resolve,
      });
    }).catch((reject) => {
      // console.log(reject);
      if (typeof reject === 'object') {
        res.status(reject.status).send({
          status:  reject.status,
          message: reject.message,
          data:    reject.data,
        });
      } else {
        res.status(500).send({
          status:  500,
          message: 'Internal server error.',
          data:    null,
        });
      }
    });
  }
};

const updateWord = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  const wordId       = req.params['wordId'];
  const body         = req.body;

  if (wordId.length !== 24) {
    res.status(400).send({
      status:  400,
      message: 'Word ID is invalid.',
      data:    null,
    });
  } else if (body === undefined || body === null) {
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
  } else if (body.translation !== undefined && body.translation !== null
             && Array.isArray(body.translation) === false) {
    res.status(400).send({
      status:  400,
      message: 'Translation must be an array.',
      data:    null,
    });
  } else if (Array.isArray(body.translation)) {
    for (const trans of body.translation) {
      if (trans.part_of_speech !== undefined && trans.part_of_speech !== null
          && typeof trans.part_of_speech !== 'string') {
        res.status(400).send({
          status:  400,
          message: 'Translation\'s part of speech must be a string.',
          data:    null,
        });
      } else if (trans.definition !== undefined && trans.definition !== null
                 && typeof trans.definition !== 'string') {
        res.status(400).send({
          status:  400,
          message: 'Translation\'s definition must be a string.',
          data:    null,
        });
      }
    }
  } else {
    wordService.updateWord(glossaryName, wordId, body).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'Word updated in ' + glossaryName + '.',
        data:    resolve,
      });
    }).catch((reject) => {
      // console.log(reject);
      if (typeof reject === 'object') {
        res.status(reject.status).send({
          status:  reject.status,
          message: reject.message,
          data:    reject.data,
        });
      } else {
        res.status(500).send({
          status:  500,
          message: 'Internal server error.',
          data:    null,
        });
      }
    });
  }
};

const deleteWord = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  const wordId       = req.params['wordId'];

  if (wordId.length !== 24) {
    res.status(400).send({
      status:  400,
      message: 'Word ID is invalid.',
      data:    null,
    });
  } else {
    wordService.deleteWord(glossaryName, wordId).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'Word deleted from ' + glossaryName + '.',
        data:    resolve,
      });
    }).catch((reject) => {
      // console.log(reject);
      if (typeof reject === 'object') {
        res.status(reject.status).send({
          status:  reject.status,
          message: reject.message,
          data:    reject.data,
        });
      } else {
        res.status(500).send({
          status:  500,
          message: 'Internal server error.',
          data:    null,
        });
      }
    });
  }
};

module.exports = {
  getWords,
  createWord,
  updateWord,
  deleteWord,
};
