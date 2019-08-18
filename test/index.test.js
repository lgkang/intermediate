const sdk = require("../refactor-exam-intermediate");
const config = {
    action: "batch",
    accessKeyID: "12345",
    accessKeySecret: "2323123",
    accountName: "皮皮",
    templateName: "你好",
    receiversName: "gk"
};

(() => {
    test("测试config.action不传的情况", () => {
        const copyConfig = JSON.parse(JSON.stringify(config));
        copyConfig.action = "";
        return sdk(copyConfig)
            .then(res => {
            })
            .catch(e => {
                expect(e).toBe("error action");
            });
    });
    test("测试config.accessKeyID不传的情况", () => {
        const copyConfig = JSON.parse(JSON.stringify(config));
        copyConfig.accessKeyID = "";
        return sdk(copyConfig)
            .then(res => {
            })
            .catch(e => {
                expect(e).toBe("accessKeyID required");
            });
    });
    test("测试非法请求的情况", () => {
        return sdk(config)
            .then(res => {
            })
            .catch(e => {
                console.log(e);
            });
    });
})();
