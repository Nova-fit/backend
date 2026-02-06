"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.logout = exports.login = exports.register = void 0;
const register = async (c) => {
    const { email, password } = (await c.req.json());
    const authService = c.get("authService");
    try {
        const user = await authService.register({
            email,
            password,
        });
        return c.json({ message: "User registered", userId: user.id }, 201);
    }
    catch (error) {
        return c.json({ message: error }, 400);
    }
};
exports.register = register;
const login = async (c) => {
    const { email, password } = await c.req.json();
    const authService = c.get("authService");
    const userAgent = c.req.header("user-agent");
    const ipAddress = c.req.header("x-forwarded-for") ||
        c.req.header("cf-connecting-ip");
    const { user, tokens } = await authService.login(email, password, userAgent, ipAddress);
    return c.json({ tokens, user }, 200);
};
exports.login = login;
const logout = async (c) => {
    try {
        const { refreshToken } = await c.req.json();
        if (!refreshToken) {
            return c.json({ message: "Refresh token requerido" }, 400);
        }
        const authService = c.get("authService");
        await authService.logout(refreshToken);
        return c.json({ message: "Sesión cerrada exitosamente" }, 200);
    }
    catch (error) {
        return c.json({ message: "Error al cerrar sesión" }, 500);
    }
};
exports.logout = logout;
const refresh = async (c) => {
    try {
        const { refreshToken } = await c.req.json();
        const authService = c.get("authService");
        const userAgent = c.req.header("user-agent");
        const ipAddress = c.req.header("x-forwarded-for") ||
            c.req.header("cf-connecting-ip");
        const tokens = await authService.refreshToken(refreshToken, userAgent, ipAddress);
        return c.json(tokens, 200);
    }
    catch (error) {
        if (error.message.includes("revocado") ||
            error.message.includes("Security Alert")) {
            return c.json({ message: "Sesión inválida o expirada" }, 403);
        }
        return c.json({ message: error.message || "Error al refrescar token" }, 401);
    }
};
exports.refresh = refresh;
exports.default = {
    register: exports.register,
    login: exports.login,
    logout: exports.logout,
    refresh: exports.refresh,
};
//# sourceMappingURL=auth.controller.js.map