import axios from "axios";
import {message} from "antd";

axios.defaults.withCredentials = true;
export const instance = axios.create({
    baseURL: '/api',
    timeout: 20000,
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use((res) => {
    res.headers.common["X-Access-Token"] = window.sessionStorage.getItem('token');
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
        .then((res) => {
            if (res.data.code === 0) {
                return res.data;
            } else {
                return res.data;
            }
        })
        .catch((error) => {
            console.log(error);

            message.warning(JSON.stringify(error))
            // return failRequest(error);
        });
}


// // Catch error and print error log
// export function failRequest(
//     error: { data: any; request: any; msg: any },
//     defaultValue?: any
// ): { message: string; error: any } {
//     let errMessage: {
//         message: Object | string;
//         error: any;
//         response?: Object;
//     };
//     if (error && error.data) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         if (error.data.status === 404) {
//             errMessage = {
//                 message: "长时间未操作,请重新登录!",
//                 error: error.data.msg
//             };
//             // window._guider.Store.user.updateStatus(false, ''); // 退出登录,自动跳转到登录页
//         } else {
//             errMessage = {
//                 message: "请求失败,系统报错:",
//                 error: error.data.msg
//             };
//         }
//     } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         errMessage = {
//             message: "网络错误,无法连接",
//             error: error.request
//         };
//     } else {
//         console.log(error);
//         // Something happened in setting up the request that triggered an Error
//         errMessage = {
//             message: error, //error.msg ? error.msg : '请求参数错误:',
//             error: error.msg
//         };
//     }
//     // window._guider.Utils.log(errMessage);
//     // window._guider.Utils.alert({
//     // 	message: errMessage.message,
//     // 	type: 'error'
//     // });
//     return defaultValue ? defaultValue : errMessage;
// }
