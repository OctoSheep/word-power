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

const getGlossaries = () => {
  return Glossary.getGlossaries().then((resolve) => {
    return resolve;
  });
};

const getGlossary = (glossaryName) => {
  return Glossary.getGlossary(glossaryName).then((resolve) => {
    return resolve;
  });
};

const createGlossary = (body) => {
  return Glossary.createGlossary(body).then((resolve) => {
    return resolve;
  });
};

const updateGlossary = (glossaryName, body) => {
  return Glossary.getGlossary(glossaryName).then((oldGlossary) => {
    if (!oldGlossary) {
      return Promise.resolve('Old glossary ' + glossaryName + ' not found.');
    }
    if (body.name !== undefined && body.name !== null) {
      return Glossary.getGlossary(body.name).then((newGlossary) => {
        if (newGlossary) {
          return Promise.resolve(
              'New glossary ' + body.name + ' already exists.');
        }
        return Word.updateGlossary(glossaryName, body.name).then(() => {
          return Glossary.updateGlossary(glossaryName, body).then((res) => {
            return res;
          });
        });
      });
    } else {
      return Glossary.updateGlossary(glossaryName, body).then((res) => {
        return res;
      });
    }
  });
};

const deleteGlossary = (glossaryName) => {
  return Glossary.getGlossary(glossaryName).then((glossary) => {
    if (!glossary) {
      return Promise.resolve('Glossary ' + glossaryName + ' not found.');
    }
    return Word.deleteGlossary(glossaryName).then(() => {
      return Glossary.deleteGlossary(glossaryName).then((res) => {
        return res;
      });
    });
  });
};

module.exports = {
  getGlossaries,
  getGlossary,
  createGlossary,
  updateGlossary,
  deleteGlossary,
};
