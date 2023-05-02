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

const cardService = require('../services/card-service');

const getLatestCard = (
  req,
  res,
) => {
  const glossaryName = req.params['glossaryName'];
  const userId       = req.params['userId'];

  if (glossaryName.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'Glossary name is required.',
      data:    null,
    });
  } else if (typeof glossaryName !== 'string') {
    res.status(400).send({
      status:  400,
      message: 'Glossary name must be a string.',
      data:    null,
    });
  } else if (userId.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'User ID is required.',
      data:    null,
    });
  } else if (userId.length !== 28) {
    res.status(400).send({
      status:  400,
      message: 'User ID is invalid.',
      data:    null,
    });
  }
  cardService.getLatestCard(
    glossaryName,
    userId,
  ).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'Card found.',
        data:    resolve,
      });
    },
  ).catch((reject) => {
    // console.log(reject);
    if (typeof reject === 'object' && reject.status !== undefined) {
      res.status(reject.status).send({
        status:  reject.status,
        message: reject.message,
        data:    reject.data,
      });
    } else if (typeof reject === 'object' && reject.status === undefined) {
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    reject,
      });
    } else {
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    null,
      });
    }
  });
};

const updateCard = (
  req,
  res,
) => {
  const wordId = req.params['wordId'];
  const userId = req.params['userId'];
  const body   = req.body;

  if (wordId.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'Card ID is required',
      data:    null,
    });
  } else if (wordId.length !== 24) {
    res.status(400).send({
      status:  400,
      message: 'Card ID is invalid',
      data:    null,
    });
  } else if (userId.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'User ID is required',
      data:    null,
    });
  } else if (userId.length !== 28) {
    res.status(400).send({
      status:  400,
      message: 'User ID is invalid',
      data:    null,
    });
  } else if (body === undefined || body === null) {
    res.status(400).send({
      status:  400,
      message: 'Body is required.',
      data:    null,
    });
  } else if (body.grade === undefined || body.grade === null) {
    res.status(400).send({
      status:  400,
      message: 'Grade is required.',
      data:    null,
    });
  } else if (typeof body.grade !== 'number') {
    res.status(400).send({
      status:  400,
      message: 'Grade must be a number.',
      data:    null,
    });
  } else if (body.grade < 0 || body.grade > 2) {
    res.status(400).send({
      status:  400,
      message: 'Grade must be between 0 and 2.',
      data:    null,
    });
  }
  cardService.updateCard(
    wordId,
    userId,
    body.grade,
  ).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'Card with ID ' + wordId + ' updated.',
        data:    resolve,
      });
    },
  ).catch((reject) => {
    // console.log(reject);
    if (typeof reject === 'object' && reject.status !== undefined) {
      res.status(reject.status).send({
        status:  reject.status,
        message: reject.message,
        data:    reject.data,
      });
    } else if (typeof reject === 'object' && reject.status === undefined) {
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    reject,
      });
    } else {
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    null,
      });
    }
  });
};

module.exports = {
  getLatestCard,
  updateCard,
};
