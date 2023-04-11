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

const Glossary = require('../database/glossary-database');
const Word     = require('../database/word-database');

const getWords = (
  glossaryName,
  id,
  word,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    Glossary.getGlossary(
      glossaryName,
    ).then((glossary) => {
      if (!glossary) {
        reject({
          status:  404,
          message: 'Glossary ' + glossaryName + ' not found.',
          data:    null,
        });
      } else {
        Word.getWords(
          glossary,
          id,
          word,
        ).then((words) => {
          if (words.length === 0) {
            reject({
              status:  404,
              message: 'No matching words found in ' + glossaryName + '.',
              data:    null,
            });
          } else {
            resolve(words);
          }
        });
      }
    });
  });
};

const createWord = (
  glossaryName,
  body,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    Glossary.getGlossary(
      glossaryName,
    ).then((glossary) => {
      if (!glossary) {
        reject({
          status:  404,
          message: 'Glossary ' + glossaryName + ' not found.',
          data:    null,
        });
      } else {
        Word.getWordByNameOrIndex(
          glossaryName,
          body.word,
          body.index,
        ).then((word) => {
          if (word) {
            reject({
              status:  409,
              message: 'Word or index already exists in ' + glossaryName + '.',
              data:    null,
            });
          } else {
            Word.createWord(
              glossaryName,
              body,
            ).then((words) => {
              Glossary.addWordId(
                glossaryName,
                words[0]._id,
              ).then(() => {
                resolve(words[0]);
              });
            });
          }
        });
      }
    });
  });
};

const updateWord = (
  glossaryName,
  wordId,
  body,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    Glossary.getGlossary(
      glossaryName,
    ).then((oldGlossary) => {
      if (!oldGlossary) {
        reject({
          status:  404,
          message: 'Old glossary ' + glossaryName + ' not found.',
          data:    null,
        });
      } else if (body.glossary !== undefined && body.glossary !== null) {
        Glossary.getGlossary(
          body.glossary,
        ).then((newGlossary) => {
          if (!newGlossary) {
            reject({
              status:  404,
              message: 'New glossary ' + body.glossary + ' not found.',
              data:    null,
            });
          } else {
            Word.getWordById(
              glossaryName,
              wordId,
            ).then((oldWord) => {
              if (!oldWord) {
                reject({
                  status:  404,
                  message: 'Word not found in ' + glossaryName + '.',
                  data:    null,
                });
              } else if ((body.word !== undefined && body.word !== null)
                         || (body.index !== undefined && body.index !== null)) {
                Word.getWordByNameOrIndex(
                  body.glossary,
                  body.word,
                  body.index,
                ).then((word) => {
                  if (word && word._id.ObjectId !== oldWord._id.ObjectId) {
                    reject({
                      status:  409,
                      message: 'Word or index already exists in '
                               + body.glossary + '.',
                      data:    null,
                    });
                  } else {
                    Glossary.deleteWordId(
                      glossaryName,
                      oldWord._id,
                    ).then(() => {
                      Word.updateWord(
                        oldWord,
                        body,
                      ).then((newWord) => {
                        Glossary.addWordId(
                          body.glossary,
                          oldWord._id,
                        ).then(() => {
                          resolve(newWord);
                        });
                      });
                    });
                  }
                });
              } else {
                Glossary.deleteWordId(
                  glossaryName,
                  oldWord._id,
                ).then(() => {
                  Word.updateWord(
                    oldWord,
                    body,
                  ).then((newWord) => {
                    Glossary.addWordId(
                      body.glossary,
                      oldWord._id,
                    ).then(() => {
                      resolve(newWord);
                    });
                  });
                });
              }
            });
          }
        });
      } else {
        Word.getWordById(
          glossaryName,
          wordId,
        ).then((oldWord) => {
          if (!oldWord) {
            reject({
              status:  404,
              message: 'Word not found in ' + glossaryName + '.',
              data:    null,
            });
          } else if ((body.word !== undefined && body.word !== null)
                     || (body.index !== undefined && body.index !== null)) {
            Word.getWordByNameOrIndex(
              glossaryName,
              body.word,
              body.index,
            ).then((word) => {
              if (word && word._id.ObjectId !== oldWord._id.ObjectId) {
                reject({
                  status:  409,
                  message: 'Word or index already exists in ' + glossaryName
                           + '.',
                  data:    null,
                });
              } else {
                Word.updateWord(
                  oldWord,
                  body,
                ).then((newWord) => {
                  resolve(newWord);
                });
              }
            });
          } else {
            Word.updateWord(
              oldWord,
              body,
            ).then((newWord) => {
              resolve(newWord);
            });
          }
        });
      }
    });
  });
};

const deleteWord = (
  glossaryName,
  wordId,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    Glossary.getGlossary(
      glossaryName,
    ).then((glossary) => {
      if (!glossary) {
        reject({
          status:  404,
          message: 'Glossary ' + glossaryName + ' not found.',
          data:    null,
        });
      } else {
        Word.getWordById(
          glossaryName,
          wordId,
        ).then((word) => {
          if (!word) {
            reject({
              status:  404,
              message: 'Word not found in ' + glossaryName + '.',
              data:    null,
            });
          } else {
            Glossary.deleteWordId(
              glossaryName,
              word._id,
            ).then(() => {
              Word.deleteWord(
                glossaryName,
                word._id,
              ).then(() => {
                resolve(word);
              });
            });
          }
        });
      }
    });
  });
};

module.exports = {
  getWords,
  createWord,
  updateWord,
  deleteWord,
};
