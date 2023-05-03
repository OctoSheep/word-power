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

const Word = require('../../v1/database/word-database');
const Card = require('../database/card-database');
const User = require('../database/user-database');

const getLatestCard = (
  glossaryName,
  userId,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    User.getUser(userId).then((userData) => {
        if (userData) {
          Card.getCards(
            glossaryName,
            userId,
          ).then((cardsData) => {
              if (cardsData.length === 0) {
                createLatestCard(
                  glossaryName,
                  userData,
                ).then((cardData) => {
                    resolve(cardData);
                  },
                ).catch((err) => {
                  reject(err);
                });
              } else {
                let latestCard = cardsData[0];
                for (let i = 1; i < cardsData.length; i++) {
                  if (new Date(cardsData[i].due) < new Date(latestCard.due)) {
                    latestCard = cardsData[i];
                  }
                }
                if (new Date(latestCard.due) < new Date()) {
                  resolve(latestCard);
                } else {
                  createLatestCard(
                    glossaryName,
                    userData,
                  ).then((cardData) => {
                      resolve(cardData);
                    },
                  ).catch((err) => {
                    reject(err);
                  });
                }
              }
            },
          ).catch((err) => {
            reject(err);
          });
        } else {
          reject({
            status:  404,
            message: 'User with openid ' + userId + ' not found',
            data:    null,
          });
        }
      },
    ).catch((err) => {
      reject(err);
    });
  });
};

const createLatestCard = (
  glossaryName,
  userData,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    const index = userData.glossaries.find((glossary) => {
      return glossary.glossary === glossaryName;
    }).index;
    Word.getWordByIndex(
      glossaryName,
      index,
    ).then((word) => {
        if (!word) {
          reject({
            status:  404,
            message: 'Word with index ' + index + ' not found',
            data:    null,
          });
        } else {
          Card.createCard(
            glossaryName,
            word._id,
            userData.openid,
            userData.globalData,
          ).then((data) => {
              userData.glossaries.find((glossary) => {
                return glossary.glossary === glossaryName;
              }).index++;
              userData.todayCount++;
              userData.totalCount++;

              User.updateUser(
                userData.openid,
                userData.name,
                data.globalData,
                userData.glossaries,
                new Date(),
                userData.todayCount,
                userData.totalCount,
              ).then(() => {
                  resolve(data.cardData);
                },
              ).catch((err) => {
                reject(err);
              });
            },
          ).catch((err) => {
            reject(err);
          });
        }
      },
    ).catch((err) => {
      reject(err);
    });
  });
};

const updateCard = (
  wordId,
  userId,
  grade,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    User.getUser(userId).then((userData) => {
        if (userData) {
          Card.getCard(
            wordId,
            userId,
          ).then((oldCardData) => {
              if (!oldCardData) {
                reject({
                  status:  404,
                  message: 'Card with wordId ' + wordId + ' not found',
                  data:    null,
                });
              } else {
                Card.updateCard(
                  oldCardData,
                  grade,
                  userData.globalData,
                ).then((data) => {
                    User.updateUser(
                      userData.openid,
                      userData.name,
                      data.globalData,
                      userData.glossaries,
                      new Date(),
                      userData.todayCount,
                      userData.totalCount,
                    ).then(() => {
                        resolve(data.cardData);
                      },
                    ).catch((err) => {
                      reject(err);
                    });
                  },
                ).catch((err) => {
                  reject(err);
                });
              }
            },
          ).catch((err) => {
            reject(err);
          });
        } else {
          reject({
            status:  404,
            message: 'User with openid ' + userId + ' not found',
            data:    null,
          });
        }
      },
    ).catch((err) => {
      reject(err);
    });
  });
};

const deleteCard = (
  wordId,
  userId,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    Card.getCard(
      wordId,
      userId,
    ).then((cardData) => {
        if (!cardData) {
          reject({
            status:  404,
            message: 'Card with wordId ' + wordId + ' not found',
            data:    null,
          });
        } else {
          Card.deleteCard(
            wordId,
            userId,
          ).then((cardData) => {
              resolve(cardData);
            },
          ).catch((err) => {
            reject(err);
          });
        }
      },
    ).catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  getLatestCard,
  updateCard,
  deleteCard,
};
