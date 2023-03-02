# Word Power 词力

## License 许可证

This program is released under license of GPL-3.0-or-later.

本程序以 GPL-3.0-or-later 许可证发布。

## MongoDB 模式

### 集合

`glossary`:

```json
{
  "_id":         "ObjectId",
  "__v":         "Number",
  "name":        {
    "type":     "String",
    "comment":  "词汇书名",
    "required": true,
    "unique":   true
  },
  "description": {
    "type":     "String",
    "comment":  "词汇书描述",
    "required": true
  },
  "vocabulary":  [
    {
      "type":    "ObjectId",
      "comment": "词汇 ID",
      "ref":     "Word"
    },
    "..."
  ]
}
```

`words`:

```json
{
  "_id":         "ObjectId",
  "__v":         "Number",
  "glossary":    {
    "type":     "String",
    "comment":  "词汇书名",
    "required": true
  },
  "index":       {
    "type":     "Number",
    "comment":  "词汇序号",
    "required": true
  },
  "word":        {
    "type":     "String",
    "comment":  "词汇名",
    "required": true
  },
  "phonetic_us": {
    "type":    "String",
    "comment": "美式音标"
  },
  "phonetic_uk": {
    "type":    "String",
    "comment": "英式音标"
  },
  "translation": [
    {
      "_id":            "ObjectId",
      "part_of_speech": {
        "type":     "String",
        "comment":  "词性",
        "required": true
      },
      "definition":     {
        "type":     "String",
        "comment":  "词义",
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
    "key":  {
      "_id": 1
    },
    "name": "_id_",
    "v":    2
  },
  {
    "key":        {
      "name": 1
    },
    "name":       "name_1",
    "v":          2,
    "background": true,
    "unique":     true
  }
]
```

`words`:

```json
[
  {
    "key":  {
      "_id": 1
    },
    "name": "_id_",
    "v":    2
  },
  {
    "key":        {
      "glossary": 1,
      "index":    1
    },
    "name":       "glossary_1_index_1",
    "v":          2,
    "background": true,
    "unique":     true
  },
  {
    "key":        {
      "glossary": 1,
      "word":     1
    },
    "name":       "glossary_1_word_1",
    "v":          2,
    "background": true,
    "unique":     true
  }
]
```

## 批量添加词汇

JSON 文件示例：

```json
[
  {
    "index":       1,
    "word":        "cancel",
    "phonetic_us": "'kænsl",
    "phonetic_uk": "'kænsl",
    "translation": [
      {
        "part_of_speech": "vt",
        "definition":     "取消，撤销；删去"
      }
    ]
  },
  {
    "index":       2,
    "word":        "explosive",
    "phonetic_us": "ɪk'splosɪv; ɪk'splozɪv",
    "phonetic_uk": "ɪk'spləusɪv",
    "translation": [
      {
        "part_of_speech": "adj",
        "definition":     "爆炸的；极易引起争论的"
      },
      {
        "part_of_speech": "n",
        "definition":     "炸药"
      }
    ]
  }
]
```
