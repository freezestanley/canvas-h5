import oneIcon from "../../../../assets/images/ex.png";
import twoIcon from "../../../../assets/images/text.png";
import threeIcon from "../../../../assets/images/ic.png";
// import fourIcon from "../../../../assets/images/add.png";
import icon1 from "../../../../assets/images/bg.png";
import icon3 from "../../../../assets/images/qc.png";

export const bottomList = [
  { icon: twoIcon, name: "文字" },
  { icon: threeIcon, name: "图片" },
  { icon: icon1, name: "背景色" },
  { icon: threeIcon, name: "背景图" },
  { icon: icon3, name: "清除背景" },
];

export const colors = [
  "transparent",
  "#000",
  "#fff",
  "#F12",
  "#06c",
  "#27d",
  "#35a",
  "#D22",
  "#ea4",
  "#bf4",
  "#ac9",
  "#de2",
  "#d99",
  "#b2b",
  "#c4c",
  "#a1a",
  "#d9d",
  "#efe",
  "#bbb",
  "#ccc",
  "#abc",
];
// 字体
export const iosFonts = [
  "华康金刚黑",
  "汉体",
  "造字工房云川体",
  "锐字潮牌真言",
];

// 滤镜
export const fitterList = [
  { name: "模糊", key: "blur", type: "Blur" },
  { name: "灰度", key: "grayscale", type: "Grayscale" },
  { name: "亮度", key: "brightness", type: "Brightness" },
  { name: "对比度", key: "contrast", type: "Contrast" },
  { name: "饱和度", key: "saturation", type: "Saturation" },
];

export interface CommonCanvasChildrenType {
  show: boolean;
  canvasRef: any;
  onClose: () => void;
}
