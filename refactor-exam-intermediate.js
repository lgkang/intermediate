const crypto = require("crypto");
const axios = require('axios').default;


module.exports = (config = {}) => {
    return new Promise((resolve, reject) => {
        const URL = "https://dm.aliyuncs.com/", nonce = Date.now(), date = new Date(), errorMsg = [];
        let param = {action: "",
            format: "JSON",
            signatureMethod: "HMAC-SHA1",
            signatureVersion: "1.0",
            signatureNonce: nonce,
            timestamp: date.toISOString(),
            version: "2015-11-23",
        };
        ["accessKeyID", "accessKeySecret", "accountName"].forEach((key) => {
            !config[key] && errorMsg.push(`${key} required`);
        });
        if (config.action === "single") {
            const {action, accessKeyID: accessKeyId, accountName, replyToAddress, addressType, toAddress, templateCode} = config;
            const configParam = {
                action,
                accessKeyId,
                accountName,
                "replyToAddress": !!replyToAddress,
                addressType,
                toAddress,
                templateCode
            };
            !toAddress && errorMsg.push("toAddress required");
            //合并参数，以config优先
            Object.assign(param, configParam);
        } else if (config.action === "batch") {
            const {action, templateName, receiversName, accessKeyID: accessKeyId, accountName, addressType = 0, templateCode, tagName} = config;
            const configParam = {
                action,
                templateName,
                receiversName,
                accessKeyId,
                accountName,
                addressType,
                templateCode,
            };
            if(tagName) {
                configParam.tagName = tagName;
            }
            !config.templateName && errorMsg.push("templateName required");
            !config.receiversName && errorMsg.push("receiversName required");
            //合并参数，以config优先
            Object.assign(param, configParam);
        } else {
            return reject("error action");
        }
        if (errorMsg.length) return reject(errorMsg.join(","));
        const newParamArr = Object.keys(param).sort();
        //首字母小写转大写
        const toUpper = (str) => str.replace(str[0], str[0].toUpperCase());
        let signStr = "", reqBody = "";
        newParamArr.forEach((key, index) => {
            const bol = index === newParamArr.length - 1;
            //不是最后一项时，添加‘&’
            signStr = signStr + encodeURIComponent(toUpper(key)) + "=" + encodeURIComponent(param[key]) + (!bol ? "&" : "");
            reqBody = reqBody + toUpper(key) + "=" + param[key] + (!bol ? "&" : "");
            if (bol) {
                signStr = "POST&%2F&" + encodeURIComponent(signStr);
            }
        });
        //加密签名
        const sign = crypto.createHmac("sha1", config.accessKeySecret + "&").update(signStr).digest("base64");
        reqBody = "Signature=" + encodeURIComponent(sign) + "&" + reqBody;
        const requestConfig = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                url: URL,
                body: reqBody,
                method: "POST"
        };
        axios(requestConfig).then(resolve).catch(reject);
    });
};

