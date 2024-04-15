import templeA from './temp/c10eb20a-b586-dd89-8dc7-d17317a0f299.json';
import templeB from './temp/b02b3740-29a8-2d03-dd94-4f00b523e9f8.json';
import templeC from './temp/f1e9724f-d5c1-8cff-9ad7-29dcdbd6f5df.json';
import templeD from './temp/396acba5-23ef-7840-94dc-a42c63560196.json';
import templeE from './temp/ccb92fb5-44c9-88c5-8966-f7bbb7636a2c.json';
import templeF from './temp/85b2f788-933c-9a47-96e1-76e5a810832b.json';
import templeG from './temp/384ad2cd-7445-ef28-b481-a4f5268a7dac.json';
import templeI from './temp/9458d035-3ba3-aabb-e0e2-7b81d5d82e64.json';
import templeJ from './temp/4293c0de-232c-10ba-3633-ab02376fad41.json';


export const templateCate = [
  {
    cate: "图片讣告",
    styles: ["清新", "古风", "大字版", "简约", "传统"],
  },
  {
    cate: "告别仪式",
    styles: ["横版", "竖版"],
  },
  {
    cate: "安葬仪式",
    styles: [],
  },
  {
    cate: "治丧费",
    styles: ["横版", "竖版"],
  },
  {
    cate: "灵位牌",
    styles: ["正面", "背面"],
  },
];
export const templateCates = Object.freeze(
  templateCate.map((item) => item.cate)
);
/**
 * 模板初始化信息，上线要替换，或者远程获取
 */


export const templates = [
  {
    t: 'c10eb20a-b586-dd89-8dc7-d17317a0f299',
    name: '水墨画1',
    tpls:Object.values(JSON.parse(templeA.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeA.tplImgs))[0],
    cate: 0,
    style: "清新",
  },
  {
    t: '396acba5-23ef-7840-94dc-a42c63560196',
    name: '水墨画2',
    tpls:Object.values(JSON.parse(templeB.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeB.tplImgs))[0],
    cate: 0,
    style: "清新",
  },
  {
    t: 'f1e9724f-d5c1-8cff-9ad7-29dcdbd6f5df',
    name: '水墨画2',
    tpls:Object.values(JSON.parse(templeC.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeC.tplImgs))[0],
    cate: 0,
    style: "清新",
  },
  {
    t: 'c10eb20a-b586-dd89-8dc7-d17317a0f299',
    name: '简约1',
    tpls:Object.values(JSON.parse(templeD.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeD.tplImgs))[0],
    cate: 0,
    style: "简约",
  },
  {
    t: 'ccb92fb5-44c9-88c5-8966-f7bbb7636a2c',
    name: '简约2',
    tpls:Object.values(JSON.parse(templeE.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeE.tplImgs))[0],
    cate: 0,
    style: "简约",
  },
  {
    t: '85b2f788-933c-9a47-96e1-76e5a810832b',
    name: '大字版1',
    tpls:Object.values(JSON.parse(templeF.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeF.tplImgs))[0],
    cate: 0,
    style: "大字版",
  },
  {
    t: '384ad2cd-7445-ef28-b481-a4f5268a7dac',
    name: '大字版1',
    tpls:Object.values(JSON.parse(templeG.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeG.tplImgs))[0],
    cate: 0,
    style: "大字版",
  },
  {
    t: '9458d035-3ba3-aabb-e0e2-7b81d5d82e64',
    name: '大字版1',
    tpls:Object.values(JSON.parse(templeI.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeI.tplImgs))[0],
    cate: 0,
    style: "大字版",
  },
  {
    t: '9458d035-3ba3-aabb-e0e2-7b81d5d82e64',
    name: '传统1',
    tpls:Object.values(JSON.parse(templeJ.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeJ.tplImgs))[0],
    cate: 0,
    style: "传统",
  }
]
