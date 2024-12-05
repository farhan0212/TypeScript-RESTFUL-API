"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
// membuat validasi form register dengan zod
UserValidation.REGISTER = zod_1.z.object({
    username: zod_1.z.string().min(3).max(100),
    password: zod_1.z.string().min(3).max(100),
    name: zod_1.z.string().min(3).max(100),
});
// membuat validasi form login dengan zod
UserValidation.LOGIN = zod_1.z.object({
    username: zod_1.z.string().min(3).max(100),
    password: zod_1.z.string().min(3).max(100),
});
// membuat validasi update user dengan zod
UserValidation.UPDATE = zod_1.z.object({
    password: zod_1.z.string().min(3).max(100).optional(),
    name: zod_1.z.string().min(3).max(100).optional(),
});
