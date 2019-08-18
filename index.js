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
    } catch (e) {
    }
})();
