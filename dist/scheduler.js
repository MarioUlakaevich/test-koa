"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduler = exports.checkForNewFiles = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const File_1 = __importDefault(require("./models/File"));
const FileController_1 = __importDefault(require("./controllers/FileController"));
async function checkForNewFiles() {
    FileController_1.default.update();
    FileController_1.default.delete();
}
exports.checkForNewFiles = checkForNewFiles;
function startScheduler() {
    node_cron_1.default.schedule('*/30 * * * *', async () => {
        const files = await File_1.default.findAll();
        if (files.length > 0) {
            checkForNewFiles();
        }
    });
}
exports.startScheduler = startScheduler;
//# sourceMappingURL=scheduler.js.map