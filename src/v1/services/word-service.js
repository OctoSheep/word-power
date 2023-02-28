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

const getWords = (glossaryName, word, id) => {
  return Glossary.getGlossary(glossaryName).then((glossary) => {
    if (!glossary) {
      return Promise.resolve(null);
    }
    return Word.getWords(glossary).then((words) => {
      if (id !== undefined) {
        return words.filter((w) => {
          return w.id === id;
        });
      } else if (word !== undefined) {
        return words.filter((w) => {
          return w.word === word;
        });
      } else {
        return words;
      }
    });
  });
};

const createWord = (glossaryName, body) => {
  return Glossary.getGlossary(glossaryName).then((glossary) => {
    if (!glossary) {
      return Promise.resolve(null);
    }
    return Word.createWord(glossaryName, body).then((word) => {
      return Glossary.addWordId(glossaryName, word).then(() => {
        return word;
      });
    });
  });
};

const updateWord = (glossaryName, wordId, body) => {
  return Glossary.getGlossary(glossaryName).then((oldGlossary) => {
    if (!oldGlossary) {
      return Promise.resolve('Old glossary ' + glossaryName + ' not found.');
    }
    if (body.glossary !== undefined && body.glossary !== null) {
      return Glossary.getGlossary(body.glossary).then((newGlossary) => {
        if (!newGlossary) {
          return Promise.resolve(
              'New glossary ' + body.glossary + ' not found.');
        }
        return Word.getWord(glossaryName, wordId).then((oldWord) => {
          if (!oldWord) {
            return Promise.resolve('Word not found in ' + glossaryName + '.');
          }
          return Glossary.deleteWordId(glossaryName, oldWord).then(() => {
            return Word.updateWord(oldWord, body).then(() => {
              return Glossary.addWordId(body.glossary, oldWord).then(() => {
                return oldWord;
              });
            });
          });
        });
      });
    }
    return Word.getWord(glossaryName, wordId).then((oldWord) => {
      if (!oldWord) {
        return Promise.resolve('Word not found in ' + glossaryName + '.');
      }
      return Word.updateWord(oldWord, body).then((newWord) => {
        return newWord;
      });
    });
  });
};

const deleteWord = (glossaryName, wordId) => {
  return Glossary.getGlossary(glossaryName).then((glossary) => {
    if (!glossary) {
      return Promise.resolve('Glossary not found.');
    }
    return Word.getWord(glossaryName, wordId).then((word) => {
      if (!word) {
        return Promise.resolve('Word not found in ' + glossaryName + '.');
      }
      return Glossary.deleteWordId(glossaryName, word).then(() => {
        return Word.deleteWord(glossaryName, word).then(() => {
          return word;
        });
      });
    });
  });
};

module.exports = {
  getWords,
  createWord,
  updateWord,
  deleteWord,
};
