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

const userServices = require('../services/user-service');

const getUser = (
  req,
  res,
) => {
  const codeOrId = req.params['codeOrId'];

  if (codeOrId.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'Code is required.',
      data:    null,
    });
  } else if (codeOrId.length === 28) {
    userServices.getUserById(codeOrId).then((resolve) => {
        // console.log(resolve);
        res.status(200).send({
          status:  200,
          message: 'User found.',
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
  } else if (codeOrId.length === 32) {
    userServices.getUserByCode(codeOrId).then((resolve) => {
        // console.log(resolve);
        res.status(200).send({
          status:  200,
          message: 'User found.',
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
  } else {
    res.status(400).send({
      status:  400,
      message: 'Code is invalid.',
      data:    null,
    });
  }
};

const updateUser = (
  req,
  res,
) => {
  const code = req.params['openid'];
  const body = req.body;

  if (body === undefined || body === null) {
    res.status(400).send({
      status:  400,
      message: 'Body is required.',
      data:    null,
    });
  } else if (body.name !== undefined && body.name !== null && typeof body.name
             !== 'string') {
    res.status(400).send({
      status:  400,
      message: 'Name must be a string.',
      data:    null,
    });
  } else if (body.globalData !== undefined && body.globalData !== null
             && typeof body.globalData !== 'object') {
    res.status(400).send({
      status:  400,
      message: 'GlobalData must be an object.',
      data:    null,
    });
  } else if (body.todayCount !== undefined && body.todayCount !== null
             && typeof body.todayCount !== 'number') {
    res.status(400).send({
      status:  400,
      message: 'TodayCount must be a number.',
      data:    null,
    });
  } else if (body.totalCount !== undefined && body.totalCount !== null
             && typeof body.totalCount !== 'number') {
    res.status(400).send({
      status:  400,
      message: 'TotalCount must be a number.',
      data:    null,
    });
  } else if (body.glossaries !== undefined && body.glossaries !== null
             && Array.isArray(body.glossaries) === false) {
    res.status(400).send({
      status:  400,
      message: 'Glossaries must be an array.',
      data:    null,
    });
  } else if (Array.isArray(body.glossaries)) {
    for (const glossary of body.glossaries) {
      if (glossary.glossary !== undefined && glossary.glossary !== null
          && typeof glossary.glossary !== 'string') {
        res.status(400).send({
          status:  400,
          message: 'Glossaries\' glossary must be a string.',
          data:    null,
        });
      } else if (glossary.index !== undefined && glossary.index !== null
                 && typeof glossary.index !== 'number') {
        res.status(400).send({
          status:  400,
          message: 'Glossaries\' index must be a number.',
          data:    null,
        });
      }
    }
  }

  userServices.updateUser(
    code,
    body.name,
    body.globalData,
    body.glossaries,
    new Date(),
    body.todayCount,
    body.totalCount,
  ).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'User updated successfully.',
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

const deleteUser = (
  req,
  res,
) => {
  const openid = req.params['openid'];

  userServices.deleteUser(
    openid,
  ).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'User deleted successfully.',
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
  getUser,
  updateUser,
  deleteUser,
};
