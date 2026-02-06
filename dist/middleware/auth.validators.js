"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Formato de email inválido"),
    password: zod_1.z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Formato de email inválido"),
    password: zod_1.z.string().min(1, "La contraseña es requerida"),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, "Refresh token es requerido"),
});
//# sourceMappingURL=auth.validators.js.map