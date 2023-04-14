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

const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  wordId:         {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Word',
    required: true,
  },
  userId:         {
    type:     String,
    ref:      'User',
    required: true,
  },
  due:            {
    type:     String,
    required: true,
  },
  interval:       {
    type:     Number,
    required: true,
  },
  difficulty:     {
    type:     Number,
    required: true,
  },
  stability:      {
    type:     Number,
    required: true,
  },
  retrievability: {
    type:     Number,
    required: true,
  },
  grade:          {
    type:     Number,
    required: true,
  },
  review:         {
    type:     String,
    required: true,
  },
  reps:           {
    type:     Number,
    required: true,
  },
  lapses:         {
    type:     Number,
    required: true,
  },
  history:        {
    type:     Array,
    required: true,
  },
});

const cardModel = mongoose.model(
  'Card',
  cardSchema,
);

module.exports = cardModel;
