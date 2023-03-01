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

const Glossary = require('../v1/database/glossary-database');
const Word     = require('../v1/database/word-database');

const getData = (glossaryName) => {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/OctoSheep/word-power-glossary/master/'
                + glossaryName + '.json';
    fetch(url,
        {
          headers: {
            Authorization: 'Bearer ' + process.env.GITHUB_TOKEN,
          },
        }).then((res) => {
      resolve(res.json());
    }).catch((err) => {
      reject(err);
    });
  });
};

const createGlossaryFromFile = (glossaryName) => {
  return new Promise((resolve, reject) => {
    getData(glossaryName).then((words) => {
      Glossary.getGlossary(glossaryName).then((glossary) => {
        if (glossary) {
          Word.createWords(glossaryName, words).then((ids) => {
            Glossary.addWordIds(glossaryName, ids).then((res) => {
              resolve(res);
            });
          });
        } else {
          reject('Glossary does not exist');
        }
      });
    }).catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  getData,
  createGlossaryFromFile,
};
