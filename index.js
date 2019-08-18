const sdk = require("./refactor-exam-intermediate");
const config = {
    action: "batch",
    accessKeyID: "12345",
    accessKeySecret: "2323123",
    accountName: "皮皮",
    templateName: "你好",
    receiversName: "gk"
};
(async () => {
    try {
        await sdk(config);
        console.log('发送成功');
    } catch (e) {
        console.log('发送失败');
        console.log(e);
    }
})();
