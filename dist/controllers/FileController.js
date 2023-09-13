"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = __importDefault(require("../models/File"));
const downloadService_1 = __importDefault(require("../services/downloadService"));
class FileController {
    static async create(ctx) {
        try {
            const { url } = ctx.request.body;
            const files = await (0, downloadService_1.default)(url);
            for (const file of files) {
                await File_1.default.create(file);
            }
            ctx.status = 200;
            ctx.body = files;
        }
        catch (error) {
            ctx.status = 400;
            ctx.body = error;
        }
    }
    static async list(ctx) {
        try {
            const files = await File_1.default.findAll();
            ctx.body = files;
        }
        catch (error) {
            ctx.status = 400;
            ctx.body = error;
        }
    }
    static async read(ctx) {
        try {
            const id = ctx.params.id;
            const file = await File_1.default.findByPk(id);
            if (file) {
                ctx.body = file;
            }
            else {
                ctx.status = 404;
                ctx.body = { message: 'File not found' };
            }
        }
        catch (error) {
            ctx.status = 400;
            ctx.body = error;
        }
    }
    static async update() {
        const files = await File_1.default.findAll();
        const newFiles = await (0, downloadService_1.default)(files[0].url);
        const newFilesToAdd = newFiles.filter(newFile => !files.some(file => file.name === newFile.name));
        for (const newFile of newFilesToAdd) {
            await File_1.default.create({
                url: files[0].url,
                name: newFile.name,
                data: newFile.data
            });
        }
    }
    static async delete() {
        const oldFiles = await File_1.default.findAll();
        const files = await (0, downloadService_1.default)(oldFiles[0].url);
        const filesToDelete = oldFiles.filter(oldFile => !files.some(file => file.name === oldFile.name));
        for (const file of filesToDelete) {
            await File_1.default.destroy({
                where: {
                    name: file.name
                }
            });
        }
    }
}
exports.default = FileController;
//# sourceMappingURL=FileController.js.map