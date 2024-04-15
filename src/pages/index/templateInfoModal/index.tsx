import { FC, useState, useMemo } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { templateCate, templateCates, templates } from "../../templates/data";
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtForm,
  AtInput,
  AtButton,
  AtRadio,
} from "taro-ui";
import "./index.scss";

export interface TemplateInfoModalType {
  show: boolean;
  info?: TemplateInfoType;
  onSubmit: (info: TemplateInfoType) => void;
  onClose: () => void;
  className?: string;
}
export interface TemplateInfoType {
  cate: number;
  style: number;
  title: string;
}
const defaultInfoValue = {
  cate: 0,
  style: 0,
  title: "",
};
const TemplateInfoModal: FC<TemplateInfoModalType> = ({
  show,
  info = defaultInfoValue,
  onClose,
  className,
  ...props
}) => {
  const [templateInfo, setTemplateInfo] = useState<TemplateInfoType>(info);
  const onSubmit = () => {
    console.log("提交", templateInfo);
    if (templateInfo.title) {
      props.onSubmit && props.onSubmit(templateInfo);
    } else {
      Taro.showToast({ title: "请填写标题", icon: "error" });
    }
  };
  const onReset = () => {
    setTemplateInfo(defaultInfoValue);
  };
  const onFormChange = (
    value: TemplateInfoType[keyof TemplateInfoType],
    type: keyof TemplateInfoType
  ) => {
    console.log(value, type);
    setTemplateInfo((tempInfo) => {
      if (type === "cate") {
        return {
          ...tempInfo,
          [type]: value,
          style: 0,
        };
      }
      return {
        ...tempInfo,
        [type]: value,
      };
    });
  };
  const hasStylesList = useMemo(
    () =>
      Array.isArray(templateCate[templateInfo.cate]?.styles) &&
      templateCate[templateInfo.cate].styles.length > 0,
    [templateInfo.cate]
  );
  return (
    <AtModal
      className={`template_info_modal ${className}`}
      key="color"
      isOpened={show}
      onClose={onClose}
    >
      <AtModalHeader>模板信息</AtModalHeader>
      <AtModalContent>
        <AtForm onSubmit={onSubmit} onReset={onReset}>
          <AtInput
            className="template_info_modal-title"
            name="title"
            title=""
            type="text"
            placeholder="请输入标题"
            value={templateInfo.title}
            onBlur={(val) => onFormChange(val, "title")}
          />
          <View className="template_info_modal-label">选择分类</View>
          <AtRadio
            className="template_info_modal-cates"
            options={templateCates.map((cate, key) => ({
              label: cate,
              value: key,
            }))}
            value={templateInfo.cate}
            onClick={(value) => onFormChange(value, "cate")}
          />
          {hasStylesList && (
            <>
              <View className="template_info_modal-label">选择风格</View>
              <AtRadio
                options={templateCate[templateInfo.cate].styles.map(
                  (style, key) => ({
                    label: style,
                    value: key,
                  })
                )}
                value={templateInfo.style}
                onClick={(value) => onFormChange(value, "style")}
              />
            </>
          )}
          <AtButton formType="submit">提交</AtButton>
          <AtButton formType="reset">重置</AtButton>
          <AtButton onClick={onClose}>关闭</AtButton>
        </AtForm>
      </AtModalContent>
    </AtModal>
  );
};

export default TemplateInfoModal;
