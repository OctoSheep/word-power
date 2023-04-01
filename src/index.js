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

const dotenv  = require('dotenv');
const express = require('express');
const cors    = require('cors');

dotenv.config();

const v1GlossaryRouter = require('./v1/routes/glossary-route');
const v1WordRouter     = require('./v1/routes/word-route');

const app  = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin:               process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((
  req,
  res,
  next,
) => {
  express.json()(
    req,
    res,
    err => {
      if (err) {
        // console.error(err);
        return res.status(400).send({
          status:  400,
          message: 'Bad request. Invalid JSON.',
          data:    null,
        });
      }
      next();
    },
  );
});

app.use(
  '/v1/glossaries',
  v1GlossaryRouter,
);
app.use(
  '/v1/words',
  v1WordRouter,
);

app.listen(
  port,
  () => {
    console.log('API is listening on port ' + port);
  },
);
