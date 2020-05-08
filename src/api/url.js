const Header = {
    "Content-Type": "application/json"
};


export const LOGIN = {
    login: {
        url: "sys/login", //登录
        method: "post",
        headers: Header
    },
    logins: {
        url: "sys/login", //登录
        method: "get",
        spell: true
    },


};

export const Signing = {

    userTaxSign: {
        url: "/tax/client/user/sign/userTaxSign", //登录
        method: "get",
        spell: true
    },
    getUserTaxTemplate: {
        url: "/tax/contract/getContractContent", //查询用户税务平台小程序签约协议
        method: "get",
        spell: true
     },
    getUserTaxSignInfo: {
        url: "/tax/client/user/sign/getUserTaxSignInfo", //pdf预览
        method: "get",
        spell: true
     },


};

