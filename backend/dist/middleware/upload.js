"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTo = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function uploadTo(subfolder) {
    const uploadDir = path_1.default.resolve('uploads', subfolder);
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
    const storage = multer_1.default.diskStorage({
        destination: (_req, _file, cb) => cb(null, uploadDir),
        filename: (_req, file, cb) => {
            const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${unique}${path_1.default.extname(file.originalname)}`);
        }
    });
    return (0, multer_1.default)({ storage });
}
exports.uploadTo = uploadTo;
