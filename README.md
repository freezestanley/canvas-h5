## 项目地址

项目入口(小程序): 待定义
静态讣告: https://github.com/freezestanley/canvas-h5.git
动态讣告: https://github.com/Kujo-Jotaro-AAAAA/quark-h5.git

## 项目概览图

![](https://private-user-images.githubusercontent.com/60122207/328342455-f3c9afb7-c160-4a9c-9ffb-7303943038b5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTUwMzgyMTMsIm5iZiI6MTcxNTAzNzkxMywicGF0aCI6Ii82MDEyMjIwNy8zMjgzNDI0NTUtZjNjOWFmYjctYzE2MC00YTljLTlmZmItNzMwMzk0MzAzOGI1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTA2VDIzMjUxM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTllY2NjN2IwN2M5OTNhZjg1N2EwYmMyYzYxMzBkOWY5MGEwNDA0MDk1MDJkYzEwOWUzZGI1NWE4YzBiMmNmZmYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.nL3TCp9BmOWofu3Mr8E9dlQLJXtcCkyB1jZiXuFcZQ8)

## 数据结构

### 静态讣告模板列表

**url: 暂未定义**

- Request: N/A
- Response: 目前为前端储存，要改造为后端请求，下列是数据结构

```ts
interface TemplateList {
  t: string; //'c10eb20a-b586-dd89-8dc7-d17317a0f299',
  name: string; // '水墨画1',
  tpls: {
    t: string; // 模板: uuid
    json: string; // 用json字符串定义描述的模板信息
  };
  tplImgs: string; // 用base64储存的模板图片，会很大待优化
  cate: Cates; // 分类字典
  style: string; // 风格(未定义字典) "清新", "古风", "大字版", "简约", "传统"
}

enum Cates {
  0 = "图片讣告",
  1 = "告别仪式",
  2 = "安葬仪式",
  3 = "治丧费",
  4 = "灵位牌",
}
```

### 动态讣告登陆

**url: /auth/login**

- Method: `POST`
- Request:

```json
{
  "email": "",
  "username": "a@a.a",
  "password": "123456"
}
```

- Response:

```json
{
  "status": true,
  "body": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBhLmEiLCJlbWFpbCI6IjEyMzQ1NiIsImF2YXRhciI6Ii9yZXNvdXJjZS9hdmF0YXIvYUBhLmEv6K-B5Lu254WnLmpwZWciLCJfaWQiOiI2NjI4YmRiOGExNDE4OTAzOGJiMWU4MzIiLCJ1c2VybmFtZSI6ImFAYS5hIiwiY3JlYXRlZCI6IjIwMjQtMDQtMjRUMDg6MDc6MjAuMTQ0WiIsInVwZGF0ZWQiOiIyMDI0LTA1LTAzVDAyOjE4OjU3LjkwN1oiLCJfX3YiOjAsImlhdCI6MTcxNTA0MDYwNywiZXhwIjoxNzE3NjMyNjA3fQ.4l1bR2P31vKe7pOLZwaCeDWnBGHXehF81U3rTGAHYqM",
    "userInfo": {
      "name": "a@a.a",
      "email": "123456",
      "avatar": "/resource/avatar/a@a.a/证件照.jpeg",
      "_id": "6628bdb8a14189038bb1e832",
      "username": "a@a.a",
      "created": "2024-04-24T08:07:20.144Z",
      "updated": "2024-05-03T02:18:57.907Z",
      "__v": 0
    }
  },
  "msg": "登录成功!",
  "code": 200
}
```

### 动态讣告-注册

**url: /auth/register**

- Method: `POST`
- Request:

```json
{ "email": "b@b.b", "username": "b", "password": "111111" }
```

- Response:

```json
{
  "status": true,
  "body": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYiIsImVtYWlsIjoiYkBiLmIiLCJhdmF0YXIiOiIiLCJfaWQiOiI2NjM5N2QwZmY1MzAyNDEyZWRjY2IxZjAiLCJ1c2VybmFtZSI6ImIiLCJjcmVhdGVkIjoiMjAyNC0wNS0wN1QwMDo1OTo1OS43NTZaIiwidXBkYXRlZCI6IjIwMjQtMDUtMDdUMDA6NTk6NTkuNzU2WiIsIl9fdiI6MCwiaWF0IjoxNzE1MDQzNTk5LCJleHAiOjE3MTc2MzU1OTl9._nqb-qj1Gk21dhuKBBS2EUuOzMnhpxNrGiWXzaW-8Og",
    "userInfo": {
      "name": "b",
      "email": "b@b.b",
      "avatar": "",
      "_id": "66397d0ff5302412edccb1f0",
      "username": "b",
      "created": "2024-05-07T00:59:59.756Z",
      "updated": "2024-05-07T00:59:59.756Z",
      "__v": 0
    }
  },
  "msg": "注册成功!",
  "code": 200
}
```

### 动态讣告-修改密码

**url: /user/update/pass**

- Method: `POST`
- Request:

```json
{
  "oldPass": "123456",
  "newPass": "111111"
}
```

- Response:

```json
{
  "status": true,
  "body": {
    "name": "a@a.a",
    "email": "123456",
    "avatar": "/resource/avatar/a@a.a/证件照.jpeg",
    "_id": "6628bdb8a14189038bb1e832",
    "username": "a@a.a",
    "created": "2024-04-24T08:07:20.144Z",
    "updated": "2024-05-07T00:12:39.286Z",
    "__v": 0
  },
  "msg": "success",
  "code": 200
}
```

### 动态讣告-创建我的作品

**url: /page/create**

- Method: `POST`
- Request:

```json
{
  "name": "",
  "title": "未命名场景",
  "description": "我用夸克可视化编辑器做了一个超酷炫的H5，快来看看吧。",
  "coverImage": "",
  "auther": "",
  "script": "",
  "width": 375,
  "height": 644,
  "pages": [
    {
      "uuid": "19f32680-a77c-4857-8e3d-0eb8a7e64d3c",
      "name": "",
      "elements": [],
      "commonStyle": {
        "backgroundColor": "",
        "backgroundImage": "",
        "backgroundSize": "cover"
      },
      "config": {}
    }
  ]
}
```

- Response:

```json
{
  "status": true,
  "body": {
    "shareConfig": {
      "coverImage": "",
      "title": "这是#分享者#的大力推荐",
      "description": "这是#分享者#大力推荐的H5"
    },
    "title": "未命名场景",
    "coverImage": "",
    "description": "我用可视化编辑器做了一个超酷炫的H5，快来看看吧。",
    "script": "",
    "width": 375,
    "height": 644,
    "pageMode": "h5",
    "flipType": 0,
    "slideNumber": false,
    "status": 1,
    "isPublish": false,
    "isTemplate": false,
    "members": [],
    "version": 1,
    "_id": "66397a06f5302412edccb1d3",
    "pages": [
      {
        "uuid": "19f32680-a77c-4857-8e3d-0eb8a7e64d3c",
        "name": "",
        "elements": [],
        "commonStyle": {
          "backgroundColor": "",
          "backgroundImage": "",
          "backgroundSize": "cover"
        }
      }
    ],
    "author": "6628bdb8a14189038bb1e832",
    "created": "2024-05-07T00:47:02.135Z",
    "updated": "2024-05-07T00:47:02.135Z",
    "__v": 0
  },
  "msg": "success",
  "code": 200
}
```

### 动态讣告我的作品列表

**url: /page/getMyPages?type=my&pageMode=h5**

- Method: `GET`
- Request:

```
type=my&pageMode=h5

type:
- cooperation // 协作模板
- my // 我的模板

pageMode:
- h5 // 多页h5类型
- longPage // 长页h5类型

```

- Response:

```json
{
  "status": true,
  "body": {
    "pages": [
      {
        "title": "模版市场1",
        "coverImage": "", // 预览图
        "isPublish": true, // 是否为共享模板
        "_id": "6628c15ca14189038bb1e889"
      }
      // {...}
    ],
    "myPageCount": 4, // 我的作品总数
    "myCooperationPageCount": 0 // 协作的作品总数
  },
  "msg": "success",
  "code": 200
}
```

### 动态讣告-复制我的作品

**url: /page/copy**

- Method: `POST`
- Request:

```
{"id":"6628c15ca14189038bb1e889"}

```

- Response:

```json
{
  "status": true,
  "body": {
    "_id": "66397b0ef5302412edccb1e7"
  },
  "msg": "success",
  "code": 200
}
```

### 动态讣告-删除我的作品

**url: /page/delete**

- Method: `POST`
- Request:

```
{"id":"663443faca069d5a6511625a"}

```

- Response:

```json
{ "status": true, "body": {}, "msg": "success", "code": 200 }
```

### 动态讣告-设置为模板作品

**url: /page/setTemplate**

- Method: `POST`
- Request:

```
{"id":"66343fec31e83258222ba89f"}
```

- Response:

```json
{
  "status": true,
  "body": {
    "_id": "66397669f5302412edccb1c8"
  },
  "msg": "success",
  "code": 200
}
```

### 动态讣告我的作品详情

**url: /page/detail?pageId=6628c15ca14189038bb1e889**

- Method: `GET`
- Request:

```
pageId=string

```

- Response:

```json
{
  "status": true,
  "body": {
    "shareConfig": {
      // 微信分享配置
      "coverImage": "",
      "title": "模版市场1",
      "description": "模版市场1",
      "shareWx": true
    },
    "title": "模版市场1",
    "coverImage": "", // 缩略图
    "description": "模版市场1", // 描述
    "script": "", // js脚本，目前没用上
    "width": 375,
    "height": 644,
    "pageMode": "h5", // 页面类型
    "flipType": 0,
    "slideNumber": false,
    "status": 1,
    "isPublish": true, // 是否公开
    "isTemplate": false, // 是否为模板
    "members": [], // 协作成员
    "version": 1,
    "_id": "6628c15ca14189038bb1e889",
    "pages": [
      // 页面列表
      {
        "uuid": "ef53cf44-d482-4a74-9c82-b661aa3afb04",
        "name": "",
        "elements": [
          // 页面中配置的元素列表
          {
            "uuid": "17d6878f-45af-421d-bd1c-675da91e32e9",
            "elName": "qk-image",
            "animations": [],
            "commonStyle": {
              "position": "absolute",
              "width": 361,
              "height": 191,
              "top": 110,
              "left": 7
              // {...} 前端的样式配置，为方便查阅省略了
            },
            "events": [],
            "propsValue": {
              "imageSrc": "http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg"
            },
            "valueType": "String"
          }
        ],
        "commonStyle": {
          // 页面级别的样式配置
          "backgroundColor": "",
          "backgroundImage": "",
          "backgroundSize": "cover"
        }
      }
    ],
    "author": "6628bdb8a14189038bb1e832", // 作者id
    "created": "2024-04-24T08:22:52.191Z",
    "updated": "2024-05-03T01:30:48.154Z",
    "__v": 0
  },
  "msg": "success",
  "code": 200
}
```

### 动态讣告我的作品更新

**url: /page/update**

- Method: `POST`
- Request:

```json
{
  "shareConfig": {
    "coverImage": "",
    "title": "模版市场1",
    "description": "模版市场1",
    "shareWx": true
  },
  "title": "模版市场1",
  "coverImage": "",
  "description": "模版市场1",
  "script": "",
  "width": 375,
  "height": 644,
  "pageMode": "h5",
  "flipType": 0,
  "slideNumber": false,
  "status": 1,
  "isPublish": true,
  "isTemplate": false,
  "members": [],
  "version": 1,
  "_id": "6628c15ca14189038bb1e889",
  "pages": [
    {
      "uuid": "ef53cf44-d482-4a74-9c82-b661aa3afb04",
      "name": "",
      "elements": [
        {
          "uuid": "5653288d-4b54-46f5-b0c9-3234185b4f53",
          "elName": "qk-text",
          "animations": [
            {
              "type": "fadeIn",
              "duration": 1,
              "infinite": "",
              "interationCount": 1,
              "delay": 0
            }
          ],
          "commonStyle": {
            "position": "absolute",
            // { ... }
            "zIndex": 3
          },
          "events": [],
          "propsValue": {
            "text": "模板市场"
          },
          "valueType": "String"
        }
      ],
      "commonStyle": {
        "backgroundColor": "",
        "backgroundImage": "",
        "backgroundSize": "cover"
      }
    }
  ],
  "author": "6628bdb8a14189038bb1e832",
  "created": "2024-04-24T08:22:52.191Z",
  "updated": "2024-05-03T01:30:48.154Z",
  "__v": 0
}
```

- Response:

```json
{ "status": true, "body": {}, "msg": "success", "code": 200 }
```

### 动态讣告我的模板

**url: /page/getMyTemplates?pageMode=h5**

- Method: `GET`
- Request:

```
pageMode: h5 | longPage
```

- Response:

```json
{
  "status": true,
  "body": [
    {
      "title": "创意模板3",
      "coverImage": "",
      "_id": "6628c1d8a14189038bb1e8ad"
    },
    {
      "title": "模版市场1",
      "coverImage": "",
      "_id": "66343e4c3d4a7753af882da8"
    }
  ],
  "msg": "success",
  "code": 200
}
```

### 动态讣告-模板市场列表

**url: /page/getPublishTemplates?pageMode=h5**

- Method: `GET`
- Request:

```
pageMode: h5 | longPage
```

- Response:

```json
{
  "status": true,
  "body": [
    {
      "title": "创意模板1",
      "coverImage": "",
      "_id": "662774b386e536c0c66e0669"
    }
    // { ... }
  ],
  "msg": "success",
  "code": 200
}
```

### 动态讣告-发布模板市场

**url: /page/setPublish**

- Method: `POST`
- Request:

```json
{ "id": "66343e4c3d4a7753af882da8" }
```

- Response:

```json
{ "status": true, "body": {}, "msg": "success", "code": 200 }
```

### 动态讣告-上传图片

**url: /imageLib/upload**

- Method: `POST`
- Request:

```
file表单数据上传
```

- Response:

```json
{
  "status": true,
  "body": {
    "url": "/resource/image_lib/a@a.a/1715043521625/xxw.png",
    "_id": "66397cc1f5302412edccb1ed",
    "author": "6628bdb8a14189038bb1e832",
    "created": "2024-05-07T00:58:41.634Z",
    "updated": "2024-05-07T00:58:41.634Z",
    "__v": 0
  },
  "msg": "success",
  "code": 200
}
```

### 动态讣告-上传头像图片

**url: /imageLib/upload**

- Method: `POST`
- Request:

```
file表单数据上传
```

- Response:

```json
{
  "status": true,
  "body": {
    "name": "a@a.a",
    "email": "123456",
    "avatar": "/resource/avatar/a@a.a/证件照.jpeg",
    "_id": "6628bdb8a14189038bb1e832",
    "username": "a@a.a",
    "created": "2024-04-24T08:07:20.144Z",
    "updated": "2024-05-07T00:55:54.444Z",
    "__v": 0
  },
  "msg": "success",
  "code": 200
}
```
