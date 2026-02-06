"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = async (c, next) => {
    try {
        await next();
    }
    catch (error) {
        console.error(error);
        const status = error.status || 500;
        return c.json({ error: error.message }, status);
    }
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map