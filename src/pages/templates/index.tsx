import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image, Input,Button } from "@tarojs/components";
import { AtButton, AtCurtain } from "taro-ui";
import { templateCate, templateImages, templates } from "./data";
import "./index.scss";

const Templates = () => {
  const [cateSelected, setCateSelected] = useState(0);
  const [styleSelected, setStyleSelected] = useState(0);
  const templatesRef = useRef();

  const scrollTemplates = () => {
    //@ts-ignore
    templatesRef.current?.scrollTo(0)
  }
  const cateList = useMemo(
    () =>
      templateCate
        .map((item) => item.cate)
        .map((item, key) => (
          <View
            className={`cate-item ${key === cateSelected ? "active" : ""}`}
            key={key}
            onClick={() => {
              setCateSelected(key);
              setStyleSelected(0);
            }}
          >
            {key === cateSelected && <View className="active"></View>}
            {item}
          </View>
        )),
    [cateSelected]
  );
  const styleList = useMemo(
    () =>
      templateCate[cateSelected].styles.map((item, key) => {
        return (
          <View
            className={`style-item ${key === styleSelected ? "active" : ""}`}
            key={key}
            onClick={() => {
              setStyleSelected(key);
            }}
          >
            {item}
          </View>
        );
      }),
    [cateSelected, styleSelected]
  );
  const templatesList = useMemo(() => {
    const filterTemplate = Object.keys(templates)
      .map((key) => ({
        ...templates[key],
        key,
      }))
      .filter((item) => {
        const currentCate = templateCate[cateSelected];
        const currentStyle =
          !item.style || currentCate.styles[styleSelected] === item.style;
        return item.cate === cateSelected && currentStyle;
      });
    return filterTemplate.map((item, idx) => {
      // const currentTemplate = templates[key]
      return (
        <View
          className="template-item"
          key={idx}
          onClick={() => {
            // 跳转到index
            console.log(item);
            Taro.navigateTo({
              url: `pages/index/index?templateKey=${item.key}`,
            });
          }}
        >
          <View
            className="template-item-img"
            style={{
              backgroundImage: `url(${templateImages[item.key]})`,
            }}
          />
          <View className="template-item-title">{item.t}</View>
        </View>
      );
    });
  }, [cateSelected, styleSelected]);
  return (
    <View className="templates-layout">
      <View className="templates-search">
        <Input
          className="search-input"
          type="text"
          placeholder="请输入模板名称"
          focus
        />
        <Button
        className="search-button"
        >搜索</Button>
      </View>
      <View className="templates-contents">
        <View className="templates-contents-left">{cateList}</View>
        <View className="templates-contents-right">
          {styleList.length > 0 && (
            <View className="templates-contents-right-nav">{styleList}</View>
          )}
          <View className="templates-contents-right-templates" ref={templatesRef}>
            {templatesList}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Templates;
