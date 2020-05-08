import axios from "axios";
import { message } from "antd";

axios.defaults.withCredentials = true;
export const instance = axios.create({
  baseURL: "/api",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(res => {
  const token = window.sessionStorage.getItem("token") || _getUrlParam("token");
  res.headers["X-Access-Token"] = token;
  return res;
});

export function makeRequest(requestData, data) {
  const config = {
    ...requestData
  };
  if (data) {
    if (config.method === "get") {
      if (config.spell) {
        config.url = `${config.url}/${data}`;
      } else {
        config.params = data;
      }
    } else {
      config.data = data;
    }
  }

  return instance(config)
    .then(res => {
      if (res.data.code === 0) {
        return res.data;
      } else {
        return res.data;
      }
    })
    .catch(error => {
      console.log(error);

      message.warning(JSON.stringify(error));
      // return failRequest(error);
    });
}

function getUrlParam(name) {
  //分割参数
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  let r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) {
    return r[2];
  }
  return null; //返回参数值
}

function _getUrlParam(parameter) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}
