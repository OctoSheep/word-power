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

const wordSchema = mongoose.Schema({
  glossary:    {
    type:     String,
    required: true,
  },
  index:       {
    type:     Number,
    required: true,
  },
  word:        {
    type:     String,
    required: true,
  },
  phonetic_us: {
    type: String,
  },
  phonetic_uk: {
    type: String,
  },
  translation: [
    {
      part_of_speech: {
        type:     String,
        required: true,
      },
      definition:     {
        type:     String,
        required: true,
      },
    }],
});

const wordModel = mongoose.model(
  'Word',
  wordSchema,
);

module.exports = wordModel;
