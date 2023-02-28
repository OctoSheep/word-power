# Word Power 词力

## License 许可证

This program is released under license of GPL-3.0-or-later.

本程序以 GPL-3.0-or-later 许可证发布。

## MongoDB 模式

### 集合

`glossary`:

```json
{
  "_id": "ObjectId",
  "__v": "Number",
  "name": {
    "type": "String",
    "required": true,
    "unique": true
  },
  "description": {
    "type": "String",
    "required": true
  },
  "vocabulary": [
    {
      "type": "ObjectId",
      "ref": "Word"
    },
    "..."
  ]
}
```

`words`:

```json
{
  "_id": "ObjectId",
  "__v": "Number",
  "glossary": {
    "type": "String",
    "required": true
  },
  "index": {
    "type": "Number",
    "required": true
  },
  "word": {
    "type": "String",
    "required": true
  },
  "phonetic_us": {
    "type": "String"
  },
  "phonetic_uk": {
    "type": "String"
  },
  "translation": [
    {
      "_id": "ObjectId",
      "part_of_speech": {
        "type": "String",
        "required": true
      },
      "definition": {
        "type": "String",
        "required": true
      }
    },
    "..."
  ]
}
```

### 索引

`glossary`:

```json
[
  {
    "key": {
      "_id": 1
    },
    "name": "_id_",
    "v": 2
  },
  {
    "key": {
      "name": 1
    },
    "name": "name_1",
    "v": 2,
    "background": true,
    "unique": true
  }
]
```

`words`:

```json
[
  {
    "key": {
      "_id": 1
    },
    "name": "_id_",
    "v": 2
  },
  {
    "key": {
      "glossary": 1,
      "index": 1
    },
    "name": "glossary_1_index_1",
    "v": 2,
    "background": true,
    "unique": true
  },
  {
    "key": {
      "glossary": 1,
      "word": 1
    },
    "name": "glossary_1_word_1",
    "v": 2,
    "background": true,
    "unique": true
  }
]
```
