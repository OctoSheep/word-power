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

require('../../v1/database/connection');
const fsrs      = require('fsrs.js');
const cardModel = require('../models/card');

const getCard = (
  wordId,
  userId,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    cardModel.findOne(
      {
        wordId: Object(wordId),
        userId: userId,
      },
      {},
      {},
    ).exec(
    ).then((card) => {
        resolve(card);
      },
    ).catch((err) => {
      reject(err);
    });
  });
};

const createCard = (
  wordId,
  userId,
  globalData,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    const cardData = fsrs(
      {
        wordId: Object(wordId),
        userId: userId,
      },
      -1,
      globalData,
    );
    const card     = new cardModel(cardData);
    cardModel.create(
      [card],
      {},
    ).then((cards) => {
        resolve(cards[0]);
      },
    ).catch((err) => {
      reject(err);
    });
  });
};

const updateCard = (
  cardData,
  grade,
  globalData,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    cardModel.findOneAndUpdate(
      {
        wordId: cardData.wordId,
        userId: cardData.userId,
      },
      {
        $set: fsrs(
          cardData,
          grade,
          globalData,
        ),
      },
      {
        new: true,
      },
    ).exec(
    ).then((card) => {
        resolve(card);
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
    cardModel.deleteOne(
      {
        wordId: Object(wordId),
        userId: userId,
      },
      {},
    ).exec(
    ).then((card) => {
        resolve(card);
      },
    ).catch((err) => {
      reject(err);
    });
  });
};

module.exports = {
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
