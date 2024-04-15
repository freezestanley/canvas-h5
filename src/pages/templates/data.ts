import templeA from './temp/c10eb20a-b586-dd89-8dc7-d17317a0f299.json';

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
    name: '水墨画',
    tpls:Object.values(JSON.parse(templeA.tpls))[0],
    tplImgs:Object.values(JSON.parse(templeA.tplImgs))[0],
    cate: 0,
    style: "清新",
  }
]
