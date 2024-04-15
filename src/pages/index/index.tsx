import { useState, useEffect, useRef, useCallback } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtButton, AtCurtain } from "taro-ui";
import { fabric } from "fabric";
import "./index.scss";
import { isIPhoneX, guid, downFontByJSON, getFilter } from "../../widget/Tools";
import { getCanvasWH } from "../../widget/util";
import alIcon from "../../assets/images/al.png";
import arIcon from "../../assets/images/ar.png";
import alnIcon from "../../assets/images/al_normal.png";
import arnIcon from "../../assets/images/ar_normal.png";
import initControls from "../../core/initControls";
import initAligningGuidelines from "../../core/initAligningGuidelines";
import {
  useFirstBtns,
  useCurrentFont,
  useCurrentTextBox,
  useCurrentImageBox,
  useFitterImageInfo,
} from "../../hooks/useIndexState";
import TempComponent from "./temp/index";
import TwoItemComponent from "./twoItem/index";
import ThreeItemComponent from "./threeItem/index";
import FourItemComponent from "./fourItem/index";
import { fitterList, bottomList } from "./twoItem/typeList";
import { download } from "../../widget/download";
import { useStore } from "../../widget/store";
import { templates } from "../templates/data";
import ColorComponent from "./twoItem/color";

type ElementType = "IText" | "Image" | "Textbox";

const baseShapeConfig = {
  Textbox: {
    text: "双击输入文字",
    fill: "#06c",
    width: 150,
    fontSize: 20,
    fontFamily: "华康金刚黑",
  },
  Image: {},
};

const Index = () => {
  // const getlist = useStore((state:any) => state);
  // const addImg = useStore((state:any) => state.addImg);
  const getVotes = useStore((state: any) => state.votes);
  // const addVotes = useStore((state:any) => state.addVotes);
  // const subtractVotes = useStore((state:any) => state.subtractVotes);
  const router = useRouter();
  const getImgList = useStore((state: any) => state.imglist);
  const addImg = useStore((state: any) => state.addImg);
  const removeImg = useStore((state: any) => state.removeImg);

  const size = getCanvasWH();
  const rato = size[1] / size[0];
  const canvasRef = useRef<any>(null); // 画布
  const workspaceEl = useRef<any>(null);
  const [option, setOptions] = useState<{ width: number; height: number }>({
    width: size[0],
    height: size[1],
  }); // 画布大小
  const workspace = useRef<fabric.Rect | null>();

  const [firstBtns, setFirstBtns] = useFirstBtns();
  const [, setCurrentFont] = useCurrentFont();
  const [currentTextBox, setCurrentTextBox] = useCurrentTextBox();
  const [currentImageBox, setCurrentImageBox] = useCurrentImageBox();
  const [, setFitterInfo] = useFitterImageInfo();
  const [imgUrlInfo, setImgUrl] = useState<{
    imgUrl: string;
    showImg: boolean;
  }>({
    imgUrl: "",
    showImg: false,
  }); // 预览图片
  const { imgUrl, showImg } = imgUrlInfo;
  const [tpls, setTpls] = useState<any>(() => {
    // 保存模板
    const tplsValue = JSON.parse(localStorage.getItem("tpls") || "{}");
    return Object.keys(tplsValue).map((item) => ({
      t: tplsValue[item].t,
      id: item,
    }));
  });
  const canvasStateRef = useRef<any[]>([]);
  const stateIndexRef = useRef<number>(-1);

  const [showColor, setShowColor] = useState<boolean>(false);

  // 插入元素
  const insertElement = (type: ElementType, url?: any) => {
    let shape: any = null;
    if (type === "Textbox") {
      shape = new fabric[type](guid(), {
        ...baseShapeConfig[type],
        left: size[0] / 2 - 75,
        top: size[1] / 2 - 20,
      });
      setCurrentFont(shape.fontFamily);
      setCurrentTextBox({
        ...currentTextBox,
        familyValue: shape.fontFamily,
        color: shape.fill,
        fontSize: shape.fontSize,
        isBold: shape.fontWeight,
        isXieTi: shape.fontStyle,
        underline: shape.underline,
        opacity: shape.opacity,
      });
      shape.width = shape.calcTextWidth() + 20;
      shape.on("changed", function (options) {
        this.width = this.calcTextWidth() + 20;
        console.log("Text changed:", shape.text);
      });
    } else if (type === "Image") {
      // fabric.Image.fromURL(url, function (oImg: any) {
      //   oImg.scale(1).set({
      //     ...baseShapeConfig[type],
      //     angle: 0,
      //     left: (size[0] - oImg.width * (size[0] / (2 * oImg.width))) / 2,
      //     top: (size[1] - oImg.height * (size[0] / (2 * oImg.width))) / 2,
      //     scaleX: size[0] / (2 * oImg.width), //按照默认的尺寸宽度为200的尺寸处理图片添加，所以此处计算原图宽和200的比例，进行缩放
      //     scaleY: size[0] / (2 * oImg.width), //纵向缩放比以横向比例为主
      //   });
      //   canvasRef.current.add(oImg).setActiveObject(oImg);
      // });

      fabric.Image.fromURL(url, function (oImg: any) {
        oImg.scale(1).set({
          ...baseShapeConfig[type],
          angle: 0,
          left: (size[0] - oImg.width * (size[0] / (2 * oImg.width))) / 2,
          top: (size[1] - oImg.height * (size[0] / (2 * oImg.width))) / 2,
          scaleX: size[0] / (2 * oImg.width), //按照默认的尺寸宽度为200的尺寸处理图片添加，所以此处计算原图宽和200的比例，进行缩放
          scaleY: size[0] / (2 * oImg.width), //纵向缩放比以横向比例为主
        });
        canvasRef.current.add(oImg).setActiveObject(oImg);
      });

      setFirstBtns({ showPop: true, firstIndex: 2 });
      return;
    }
    canvasRef.current.add(shape).setActiveObject(shape); // 添加并设置激活
  };

  const _getScale = useCallback(() => {
    const viewPortWidth = workspaceEl.current.offsetWidth;
    const viewPortHeight = workspaceEl.current.offsetHeight;
    // 按照宽度
    if (viewPortWidth / viewPortHeight < option.width / option.height) {
      return viewPortWidth / option.width;
    } // 按照宽度缩放
    return viewPortHeight / option.height;
  }, [option]);

  // 初始化背景
  const initBackground = (canvas) => {
    canvasRef.current.setBackgroundColor("#fff", canvas.renderAll.bind(canvas));
    canvasRef.current.setWidth(workspaceEl.current.offsetWidth * 0.8);
    canvasRef.current.setHeight(workspaceEl.current.offsetWidth * 0.8 * rato);
  };

  /**
   * 设置画布中心到指定对象中心点上
   * @param {Object} obj 指定的对象
   */
  const setCenterFromObject = (obj: fabric.Rect, canvas: any) => {
    const objCenter = obj.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    )
      return;
    viewportTransform[4] =
      canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] =
      canvas.height / 2 - objCenter.y * viewportTransform[3];
    canvas.setViewportTransform(viewportTransform);
    canvas.renderAll();
  };

  const setZoomAuto = (
    scale: number,
    cb?: (left?: number, top?: number) => void
  ) => {
    const center = canvasRef.current.getCenter();
    canvasRef.current.setViewportTransform(fabric.iMatrix.concat());
    canvasRef.current.zoomToPoint(
      new fabric.Point(center.left, center.top),
      scale
    );
    if (!workspace.current) return;
    setCenterFromObject(workspace.current, canvasRef.current);

    // 超出画布不展示
    workspace.current.clone((cloned: fabric.Rect) => {
      cloned.id = "workspace";
      canvasRef.current.clipPath = cloned;
      canvasRef.current.requestRenderAll();
    });
    if (cb) cb(workspace.current.left, workspace.current.top);
  };

  // 初始化画布
  const initWorkspace = (canvas: any) => {
    const { width, height } = option;
    const workspace1 = new fabric.Rect({
      fill: "transparent",
      width,
      height,
      id: "workspace",
    });
    workspace1.set("selectable", false);
    workspace1.set("hasControls", false);
    workspace1.hoverCursor = "";
    canvas.add(workspace1);
    canvas.renderAll();
    workspace.current = workspace1;
    // const scale = _getScale();
    // setZoomAuto(scale);
    setZoomAuto(1);
  };

  // 重置画布
  const setNewSize = () => {
    // 重新设置workspace
    workspace.current = canvasRef.current
      .getObjects()
      .find((item) => item.id === "workspace") as fabric.Rect;
    if (workspace.current) {
      setOptions({
        width: workspace.current.width,
        height: workspace.current.height,
      });
      workspace.current.set("width", workspace.current.width);
      workspace.current.set("height", workspace.current.height);
    }
    // const scale = _getScale();
    // setZoomAuto(scale);
    setZoomAuto(1);
  };

  const setSliderFitterValue = () => {
    const activeObj = canvasRef.current.getActiveObject();
    let obj: any = {};
    fitterList.forEach((item) => {
      let itemFilter: any = getFilter(activeObj, item.type);
      if (itemFilter) {
        let v = itemFilter[item.key];
        let v1 = (v * 100).toFixed(0);
        obj[item.key] = v1;
      }
    });
    setFitterInfo({
      blur: obj?.blur ?? 0,
      grayscale: obj?.grayscale ?? 0,
      brightness: obj?.brightness ?? 0,
      contrast: obj?.contrast ?? 0,
      saturation: obj?.saturation ?? 0,
    });
  };

  const mouseDown = (opt: any) => {
    // debugger
    const activeObj = canvasRef.current.getActiveObject();
    if (activeObj) {
      // 如果是文字
      // console.log(activeObj.get("type"));
      if (activeObj.get("type") == "textbox") {
        setCurrentFont(activeObj.fontFamily);
        setCurrentTextBox({
          ...currentTextBox,
          familyValue: activeObj.fontFamily,
          color: activeObj.fill,
          fontSize: activeObj.fontSize,
          isBold: activeObj.fontWeight,
          isXieTi: activeObj.fontStyle,
          underline: activeObj.underline,
          opacity: activeObj.opacity,
        });
        setFirstBtns({ showPop: true, firstIndex: 1 });
      } else if (["image", "clipImage"].includes(activeObj.get("type"))) {
        setCurrentImageBox({ ...currentImageBox, opacity: activeObj.opacity });
        setSliderFitterValue();
        setFirstBtns({ showPop: true, firstIndex: 2 });
      }
    } else {
      setFirstBtns({ firstIndex: -1, showPop: false });
    }
  };

  const mouseUp = (opt: any) => {
    // console.log(opt);
    const activeObj = canvasRef.current.getActiveObject();
    !activeObj && setFirstBtns({ firstIndex: -1, showPop: false });
  };

  const updateCanvasState = () => {
    const canvasAsJson = JSON.stringify(
      canvasRef.current.toJSON(["id", "selectable", "hasControls"])
    );
    canvasStateRef.current.splice(stateIndexRef.current + 1);
    canvasStateRef.current.push(canvasAsJson);
    stateIndexRef.current = canvasStateRef.current.length - 1;
    // console.log("up", canvasStateRef.current, stateIndexRef.current);
  };

  const historyState = (index: number) => {
    // console.log("dd", index, canvasStateRef.current, stateIndexRef.current);
    canvasRef.current.loadFromJSON(
      JSON.parse(canvasStateRef.current[index]),
      () => {
        canvasRef.current.renderAll();
        stateIndexRef.current = index;
      }
    );
  };

  useEffect(() => {
    initCanvas();
    const { templateKey } = router.params;
    renderTemplateByTemplateKey(templateKey!);
    return () => {
      canvasRef.current = null;
    };
  }, []);
  const initCanvas = () => {
    workspaceEl.current = document.querySelector("#workspace") as HTMLElement;
    // console.log(workspaceEl.current.offsetWidth, "画布底层width");
    if (!workspaceEl.current) {
      throw new Error("element #workspace is missing, plz check!");
    }
    canvasRef.current = new fabric.Canvas("c", {
      preserveObjectStacking: true, // 禁止被选中的元素跑到视图的最顶层，保留原层级
      selection: false,
      includeDefaultValues: false, // 精简json
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    });
    workspace.current = null;
    // 选择器样式
    initControls(canvasRef.current);
    // 辅助线
    initAligningGuidelines(canvasRef.current);
    initBackground(canvasRef.current);
    initWorkspace(canvasRef.current);

    canvasRef.current.on({
      "mouse:down": mouseDown,
      "mouse:up": mouseUp,
      "object:modified": updateCanvasState,
      "object:added": updateCanvasState,
    });
  };
  const renderTemplateByTemplateKey = (templateKey: string) => {
    console.log({
      templateKey,
      templates,
    });

    if (templateKey !== undefined && templateKey in templates) {
      canvasRef.current.loadFromJSON(templates[templateKey].json, () => {
        console.log("init canvas ===>", { canvasRef });
      });
    }
  };
  const getImgUrl = () => {
    const img = document.getElementById("c");
    const src = (img as HTMLCanvasElement).toDataURL("image/png");
    return src;
  };
  // 预览
  const handlePreview = () => {
    canvasRef.current.discardActiveObject();
    canvasRef.current.renderAll();
    setImgUrl({
      showImg: true,
      imgUrl: getImgUrl(),
    });
  };
  // 清空画布
  const clear = () => {
    canvasRef.current.clear();
  };

  const handleSaveTpl = () => {
    const id = guid();
    const val = `模板:${id}`; // 模板名字
    const json = canvasRef.current.toDatalessJSON([
      "id",
      "selectable",
      "hasControls",
    ]);
    // 存json
    const tplsV = JSON.parse(localStorage.getItem("tpls") || "{}");
    tplsV[id] = { json, t: val };
    localStorage.setItem("tpls", JSON.stringify(tplsV));
    // 存图片
    // 当前对象不再处于激活状态
    canvasRef.current.discardActiveObject();
    // 重新渲染画布
    canvasRef.current.renderAll();
    const imgUrls = getImgUrl();
    const tplImgs = JSON.parse(localStorage.getItem("tplImgs") || "{}");
    tplImgs[id] = imgUrls;
    localStorage.setItem("tplImgs", JSON.stringify(tplImgs));
    setTpls((prev: any) => [...prev, { id, t: val }]);
    Taro.showToast({ title: "模板保存成功！", icon: "success" });

    const zCanvas = document.createElement("canvas");
    zCanvas.width = 1080;
    zCanvas.height = 1960;
    const zctx = zCanvas.getContext("2d");
    if (
      canvasRef.current.getElement().width &&
      canvasRef.current.getElement().height
    ) {
      zctx?.drawImage(
        canvasRef.current.getElement(),
        // (canvasRef.current.getWidth() - workspace.current.width)/2,
        // (canvasRef.current.getHeight() - workspace.current.height)/2,
        // workspace.current.width,
        // workspace.current.height,
        0,
        0,
        canvasRef.current.getElement().width,
        canvasRef.current.getElement().height,
        0,
        0,
        1080,
        1960
      );
      // download(canvasRef.current.toDataURL("image/png"));
      download(zCanvas.toDataURL("image/png"));
      const result = addImg(zCanvas.toDataURL("image/png"));
    }
  };

  // 读取模板 json
  const renderJson = (id: string) => {
    const tplsV = JSON.parse(localStorage.getItem("tpls") || "{}");
    clear();
    // 加载字体后导入
    downFontByJSON(tplsV[id].json).then(() => {
      canvasRef.current.loadFromJSON(tplsV[id].json, () => {
        canvasRef.current.renderAll.bind(canvasRef.current);
        setNewSize();
      });
    });
    // console.log(tplsV, tplsV[id].json);
  };

  const firstItemTap = (index: number) => {
    switch (index) {
      // case 0:
      //   setFirstBtns({ showPop: true, firstIndex: index });
      //   break;
      case 0:
        insertElement("Textbox");
        setFirstBtns({ showPop: true, firstIndex: index });
        break;
      case 1:
        Taro.chooseImage({
          count: 1,
          sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            // 方式一
            // 上面的实现方式，如果是在纯前端的环境下，保存时背景图是地址是本地地址( 'blob:http://192.168.1.4:10086/3b64aab5-df0e-4ed2-affc-791f8a52c346' )。
            // 这样不是很好，如果在别的电脑想通过 反序列化 渲染出来的时候，可能会出现问题
            // const tempFilePaths = res.tempFilePaths;
            // insertElement("Image", tempFilePaths[0]);

            // 方式二 可以将file 图片转成 base64 再生成背景图。
            const tempFiles = res.tempFiles;
            if (tempFiles[0].originalFileObj) {
              const reader = new FileReader();
              reader.readAsDataURL(tempFiles[0].originalFileObj);
              // 图片文件完全拿到后执行
              reader.onload = () => {
                // 转换成base64格式
                const base64Img = reader.result;
                insertElement("Image", base64Img);
              };
            }
          },
        });
        break;
      case 2:
        setShowColor(true);
        break;
      case 3:
        Taro.chooseImage({
          count: 1, // 默认9
          sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
          success: function (res) {
            Taro.getImageInfo({
              // 获取图片宽高
              src: res.tempFilePaths[0],
              success: function (resp) {
                const tempFiles = res.tempFiles;
                // onAddChildrenTap({
                //   index: 1,
                //   imgStr: tempFiles[0].originalFileObj,
                //   imgW: resp.width,
                //   imgH: resp.height,
                // });
                if (tempFiles[0].originalFileObj) {
                  const reader = new FileReader();
                  reader.readAsDataURL(tempFiles[0].originalFileObj);
                  // 图片文件完全拿到后执行
                  reader.onload = () => {
                    // debugger;
                    console.log(canvasRef.current.getWidth());
                    console.log(canvasRef.current.getHeight());

                    const w = canvasRef.current.getWidth();
                    const h = canvasRef.current.getHeight();
                    // 转换成base64格式
                    const base64Img = reader.result;

                    // canvasRef.current.setBackgroundImage(
                    //   base64Img,
                    //   canvasRef.current.renderAll.bind(canvasRef.current),
                    //   {
                    //     // 保证背景图1:1铺满容器
                    //     scaleX: 1 - canvasRef.current.getWidth() / resp.width, //计算出图片要拉伸的宽度
                    //     scaleY: 1 - canvasRef.current.getHeight() / resp.height, //计算出图片要拉伸的高度
                    //     top: 0,
                    //     left: 0,
                    //   }
                    // );
                    const rate =
                      Math.max(
                        (canvasRef.current.getElement().offsetWidth /
                          resp.width) *
                          100
                      ) / 100;
                    const [originX, originY] = [
                      size[0] / 2 -
                        canvasRef.current.getElement().offsetWidth / 2,
                      size[1] / 2 -
                        canvasRef.current.getElement().offsetHeight / 2,
                    ];
                    if (resp.width > w) {
                      // 将文本对象添加到canvas上
                      canvasRef.current.setBackgroundImage(
                        base64Img,
                        canvasRef.current.renderAll.bind(canvasRef.current),
                        {
                          // 保证背景图1:1铺满容器
                          // scaleX: 1 - canvasRef.current.getWidth() / resp.width, //计算出图片要拉伸的宽度
                          // scaleY: 1 - canvasRef.current.getWidth() / resp.width, //计算出图片要拉伸的高度
                          // top: 0,
                          // left: 0,
                          scaleX: rate, //计算出图片要拉伸的宽度
                          scaleY: rate, //计算出图片要拉伸的高度
                          left: originX,
                          top: originY,
                        }
                      );
                    } else {
                      canvasRef.current.setBackgroundImage(
                        base64Img,
                        canvasRef.current.renderAll.bind(canvasRef.current),
                        {
                          // 保证背景图1:1铺满容器
                          scaleX: 1, //计算出图片要拉伸的宽度
                          scaleY: 1, //计算出图片要拉伸的高度
                          top: 0,
                          left: 0,
                        }
                      );
                    }
                  };
                }
              },
            });
          },
        });
        break;
      case 4:
        // 设置为null , 设置为""无效
        canvasRef.current.setBackgroundImage(
          null,
          canvasRef.current.renderAll.bind(canvasRef.current)
        );
        break;
      default:
        break;
    }
  };

  const renderFirst = () => {
    switch (firstBtns?.firstIndex) {
      case 1:
        return <TwoItemComponent canvasRef={canvasRef.current} />;
      case 2:
        return <ThreeItemComponent canvasRef={canvasRef.current} />;
      case 3:
        return <FourItemComponent canvasRef={canvasRef.current} />;
      default:
        return null;
    }
  };

  return (
    <>
      <View className="index-index">
        <View className="head-top-view">
          <View className="left-btn-view"></View>
          <View className="head-row-item-r">
            <View
              className="close_btn"
              onClick={() => {
                // 用navigateTo会导致模板渲染出问题
                // Taro.navigateTo({
                //   url: `pages/templates/index`,
                // });
                // 用下面两个都行
                // Taro.navigateBack();
                Taro.redirectTo({
                  url: `pages/templates/index`,
                });
              }}
            >
              关闭
            </View>
            <Image
              className="image-icon"
              src={stateIndexRef.current > 0 ? alIcon : alnIcon}
              onClick={() => {
                if (stateIndexRef.current == 0) return;
                historyState(stateIndexRef.current - 1);
              }}
            />
            <Image
              className="image-icon"
              src={
                stateIndexRef.current < canvasStateRef.current.length - 1
                  ? arIcon
                  : arnIcon
              }
              onClick={() => {
                if (stateIndexRef.current == canvasStateRef.current.length - 1)
                  return;
                historyState(stateIndexRef.current + 1);
              }}
            />

            <AtButton
              className="ml-1 mr-2 see-btn"
              size="small"
              onClick={handlePreview}
            >
              预览
            </AtButton>

            <View className="save-btn" onClick={handleSaveTpl}>
              保存
            </View>
          </View>
        </View>
        <View
          className="canvas-view"
          id="workspace"
          style={{ marginBottom: isIPhoneX() ? "10vh" : "6vh" }}
        >
          <canvas id="c"></canvas>
        </View>
        <View
          className="head-footer-view"
          style={{
            height: isIPhoneX() ? "108px" : "80px",
            paddingBottom: isIPhoneX() ? "28px" : "8px",
          }}
        >
          {bottomList.map((item: any, index: number) => (
            <View
              key={index}
              className="bottom-item-col"
              onClick={() => firstItemTap(index)}
            >
              <Image src={item.icon} className="bottom-item-img" />
              <Text className="bottom-item-title">{item.name}</Text>
            </View>
          ))}
          <ColorComponent
            typeKey="bg"
            show={showColor}
            onClose={() => setShowColor(false)}
            canvasRef={canvasRef}
          />
        </View>
      </View>
      {firstBtns?.showPop && firstBtns?.firstIndex != 0 ? (
        <View className="text-btn-item-view">{renderFirst()}</View>
      ) : null}
      {/* {firstBtns?.showPop && firstBtns?.firstIndex == 0 ? (
        <TempComponent
          localList={tpls}
          show={firstBtns?.showPop && firstBtns?.firstIndex == 0}
          tempItemTap={(res) => {
            setFirstBtns({ showPop: false, firstIndex: -1 });
            renderJson(res.id);
          }}
          onClose={() => {
            setFirstBtns({ showPop: false, firstIndex: -1 });
          }}
        />
      ) : null} */}
      <AtCurtain
        isOpened={showImg}
        closeBtnPosition="top"
        onClose={() => setImgUrl({ showImg: false, imgUrl: "" })}
      >
        <Image style={{ width: "100%", height: "82vh" }} src={imgUrl} />
      </AtCurtain>
    </>
  );
};

export default Index;
