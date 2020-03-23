import "./signing.scss";
import React, { useEffect, useState } from "react";
import { Button, message, Skeleton } from "antd";
import Api from "./../../api/api";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Signig = () => {
  const [numPages, setNumPages] = useState(null);
  const [pdf, setPdf] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    getUserTaxTemplate();
    window.sessionStorage.setItem("token", getUrlParam("token"));
  }, []);
  return (
    <div className="signig">
      {/*<span className='signig-code'>2000189281</span>*/}
      <Document
        className="pdfStyle"
        file={pdf}
        // file={require('../../img/target_7.pdf')}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={loading()}
      >
        {/*<span*/}
        {/*    className='pdfStyle-date'*/}
        {/*>2020-3-14</span>*/}
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
      {/*<iframe*/}
      {/*  height="800"*/}
      {/*  src="https://yunnanapp.oss-cn-beijing.aliyuncs.com/target.pdf"*/}
      {/*></iframe>*/}

      <div className="signig-foot">
        <Button onClick={callbackApp} size="large" type="primary">
          签约
        </Button>
      </div>
    </div>
  );
  function onDocumentLoadSuccess(document) {
    const { numPages } = document;
    setNumPages(numPages);
  }
  async function callbackApp() {
    let result = await Api.webView.submitSigning(id);
    if (result && result.success) {
      setTimeout(() => {
        window.wx.miniProgram.postMessage({ data: true });
        window.wx.miniProgram.redirectTo({
          url: "/pages/personal/personal"
        });
      }, 1000);
    } else {
      message.error(result.message);
    }
  }

  async function getUserTaxTemplate() {
    try {
      let result = await Api.webView.getUserTaxTemplate();
      console.log(result);
      if (result && result.success && result.result) {
        setPdf(result.result.signContent);
        setId(result.result.id);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export default Signig;

function getUrlParam(name) {
  //分割参数
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  let r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) {
    return r[2];
  }
  return null; //返回参数值
}

const loading = () => {
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
