"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const token_services_1 = require("@/services/token.services");
const authMiddleware = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = await token_services_1.TokenService.verifyAccessToken(token);
        c.set('jwtPayload', payload);
        await next();
    }
    catch (error) {
        return c.json({ error: 'Invalid token' }, 401);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middlewre.js.map