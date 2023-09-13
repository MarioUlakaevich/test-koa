"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function downloadService(url) {
    try {
        const response = await axios_1.default.get(url);
        const fileList = response.data;
        const downloadedFiles = [];
        for (const fileMeta of fileList) {
            const fileResponse = await axios_1.default.get(fileMeta.url, { responseType: 'arraybuffer' });
            downloadedFiles.push({
                url: fileMeta.url,
                name: fileMeta.name,
                data: fileResponse.data
            });
        }
        return downloadedFiles;
    }
    catch (error) {
        console.error(`Failed to download files: ${error}`);
        return [];
    }
}
;
exports.default = downloadService;
//# sourceMappingURL=downloadService.js.map