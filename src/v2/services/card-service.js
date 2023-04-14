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

const Card = require('../database/card-database');
const User = require('../database/user-database');

const getCard = (
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
      if (cardData) {
        resolve(cardData);
      } else {
        User.getUser(userId).then((user) => {
            if (user) {
              Card.createCard(
                wordId,
                userId,
                user.globalData,
              ).then((cardData) => {
                  resolve(cardData);
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
      }
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
    User.getUser(userId).then((user) => {
        if (user) {
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
                user.globalData,
              ).then(() => {
                  Card.getCard(
                    wordId,
                    userId,
                  ).then((cardData) => {
                      resolve(cardData);
                    },
                  ).catch((err) => {
                    reject(err);
                  });
                },
              ).catch((err) => {
                reject(err);
              });
            }
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
    });
  });
};

module.exports = {
  getCard,
  updateCard,
  deleteCard,
};
