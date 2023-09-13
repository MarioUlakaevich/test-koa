"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const FileController_1 = __importDefault(require("../controllers/FileController"));
const router = new router_1.default();
router.post('/files', FileController_1.default.create);
router.get('/files', FileController_1.default.list);
router.get('/files/:id', FileController_1.default.read);
exports.default = router;
//# sourceMappingURL=index.js.map