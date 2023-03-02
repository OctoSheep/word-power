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

const Glossary      = require('../database/glossary-database');
const Word          = require('../database/word-database');
const githubService = require('./github-service');

const getGlossaries = () => {
  return new Promise((
    resolve,
    reject,
  ) => {
    Glossary.getGlossaries().then((glossaries) => {
      if (!glossaries) {
        reject({
          status:  404,
          message: 'No glossaries found.',
          data:    null,
        });
      } else {
        resolve(glossaries);
      }
    });
  });
};

const getGlossary = (
  glossaryName,
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
        resolve(glossary);
      }
    });
  });
};

const createGlossary = (
  glossaryName,
  glossaryDescription,
  url,
  authorization,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    Glossary.getGlossary(
      glossaryName,
    ).then((glossary) => {
      if (glossary) {
        reject({
          status:  409,
          message: 'Glossary ' + glossaryName + ' already exists.',
          data:    null,
        });
      } else if (!url) {
        Glossary.createGlossary(
          glossaryName,
          glossaryDescription,
        ).then((glossaries) => {
          resolve(glossaries[0]);
        });
      } else {
        githubService.getJson(
          url,
          authorization,
        ).then((words) => {
          Glossary.createGlossary(
            glossaryName,
            glossaryDescription,
          ).then(() => {
            Word.createWords(
              glossaryName,
              words.json(),
            ).then((ids) => {
              Glossary.addWordIds(
                glossaryName,
                ids,
              ).then(() => {
                Glossary.getGlossary(
                  glossaryName,
                ).then((glossary) => {
                  resolve(glossary);
                });
              });
            });
          });
        }).catch((error) => {
          // console.log(error);
          reject({
            status:  400,
            message: 'Error while fetching words from GitHub.',
            data:    error,
          });
        });
      }
    });
  });
};

const updateGlossary = (
  glossaryName,
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
      } else if (body.name !== undefined && body.name !== null) {
        Glossary.getGlossary(
          body.name,
        ).then((newGlossary) => {
          if (newGlossary) {
            reject({
              status:  409,
              message: 'New glossary ' + body.name + ' already exists.',
              data:    null,
            });
          } else {
            Word.updateGlossary(
              glossaryName,
              body.name,
            ).then(() => {
              Glossary.updateGlossary(
                glossaryName,
                body,
              ).then(() => {
                Glossary.getGlossary(
                  body.name,
                ).then((glossary) => {
                  resolve(glossary);
                });
              });
            });
          }
        });
      } else {
        Glossary.updateGlossary(
          glossaryName,
          body,
        ).then(() => {
          Glossary.getGlossary(
            glossaryName,
          ).then((glossary) => {
            resolve(glossary);
          });
        });
      }
    });
  });
};

const deleteGlossary = (
  glossaryName,
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
        Word.deleteGlossary(
          glossaryName,
        ).then(() => {
          Glossary.deleteGlossary(
            glossaryName,
          ).then(() => {
            resolve(glossary);
          });
        });
      }
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
