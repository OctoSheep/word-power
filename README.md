# Word Power 词力

## License 许可证

This program is released under license of GPL-3.0-or-later.

本程序以 GPL-3.0-or-later 许可证发布。

## MongoDB 模式

`glossary` 集合

```json
{
  "_id": "ObjectId",
  "__v": "Number",
  "name": "String",
  "description": "String",
  "vocabulary": [
    "ObjectId",
    "ObjectId",
    "..."
  ]
}
```

`glossary` 索引

```json
{
  "name": 1
}
```

`vocabulary` 集合

```json
{
  "_id": "ObjectId",
  "__v": "Number",
  "word": "String",
  "glossary": "String",
  "index": "Number",
  "phonetic_us": "String",
  "phonetic_uk": "String",
  "translation": [
    {
      "_id": "ObjectId",
      "part_of_speech": "String",
      "definition": "String"
    },
    {
      "_id": "ObjectId",
      "part_of_speech": "String",
      "definition": "String"
    },
    "..."
  ]
}
```

`vocabulary` 索引

```json
{
  "glossary": 1,
  "index": 1,
  "word": 1
}
```
