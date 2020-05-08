import "./signing.scss";
import React, { useEffect, useState } from "react";
import { message, Skeleton, Spin } from "antd";
import Api from "./../../api/api";

const Signig = () => {
  const [url, setUlr] = useState(
    "https://oss.zfycloud.com/template/user_sign_template_image.png"
  );
  const [spinning, setSpinning] = useState(false);
  useEffect(() => {
    window.sessionStorage.setItem("token", getUrlParam("token"));
    // getUserTaxTemplate();
    // window.TOKEN = getUrlParam("token");
  }, []);
  return (
    <Spin tip="数据加载中" size="large" spinning={spinning}>
      <div className="signig">
        {url ? <img className="signig-img" src={url} alt="img" /> : <Loading />}

        {/*<div className="signig-foot">*/}
        {/*  <Button onClick={callbackApp} size="large" type="primary">*/}
        {/*    签约*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
    </Spin>
  );
  async function callbackApp() {
    setSpinning(true);
    let result = await Api.webView.submitSigning();
    if (result && result.success) {
      window.wx.miniProgram.postMessage({ data: true });
      window.wx.miniProgram.redirectTo({
        url: "/pages/personal/personal"
      });
      setSpinning(false);
    } else {
      setSpinning(false);
      message.error(result.message);
    }
  }

  async function getUserTaxTemplate() {
    setSpinning(true);
    try {
      let result = await Api.webView.getUserTaxTemplate("user_sign_image_url");

      if (result && result.success && result.result) {
        setUlr(result.result);
        setSpinning(false);
      }
    } catch (e) {
      setSpinning(false);
      console.log(e);
    }
  }
};

export default Signig;

function getUrlParam(parameter) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}

const Loading = () => {
  return (
    <div>
      <Skeleton className="all" active />
      <Skeleton className="all" active />
      <Skeleton className="all" active />
      <Skeleton className="all" active />
      <Skeleton className="all" active />
    </div>
  );
};
