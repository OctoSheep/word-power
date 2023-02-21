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
      if (word !== undefined) {
        return words.filter((w) => {
          return w.word === word;
        });
      } else if (id !== undefined) {
        return words.filter((w) => {
          return w.id === id;
        });
      } else {
        return words;
      }
    });
  });
};

module.exports = {
  getWords,
};
