import { Context } from "hono";
export declare const register: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    message: string;
    userId: any;
}, 201, "json">) | (Response & import("hono").TypedResponse<never, 400, "json">)>;
export declare const login: (c: Context) => Promise<Response & import("hono").TypedResponse<{
    tokens: any;
    user: any;
}, 200, "json">>;
export declare const logout: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
    message: string;
}, 400, "json">) | (Response & import("hono").TypedResponse<{
    message: string;
}, 200, "json">) | (Response & import("hono").TypedResponse<{
    message: string;
}, 500, "json">)>;
export declare const refresh: (c: Context) => Promise<(Response & import("hono").TypedResponse<any, 200, "json">) | (Response & import("hono").TypedResponse<{
    message: string;
}, 403, "json">) | (Response & import("hono").TypedResponse<{
    message: any;
}, 401, "json">)>;
declare const _default: {
    register: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
        userId: any;
    }, 201, "json">) | (Response & import("hono").TypedResponse<never, 400, "json">)>;
    login: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        tokens: any;
        user: any;
    }, 200, "json">>;
    logout: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, 400, "json">) | (Response & import("hono").TypedResponse<{
        message: string;
    }, 200, "json">) | (Response & import("hono").TypedResponse<{
        message: string;
    }, 500, "json">)>;
    refresh: (c: Context) => Promise<(Response & import("hono").TypedResponse<any, 200, "json">) | (Response & import("hono").TypedResponse<{
        message: string;
    }, 403, "json">) | (Response & import("hono").TypedResponse<{
        message: any;
    }, 401, "json">)>;
};
export default _default;
//# sourceMappingURL=auth.controller.d.ts.map