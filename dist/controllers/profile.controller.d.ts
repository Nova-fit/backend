import { Context } from "hono";
declare const _default: {
    getProfile: (c: Context) => Promise<(Response & import("hono").TypedResponse<any, 200, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 404, "json">)>;
    updateProfile: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, 200, "json">) | (Response & import("hono").TypedResponse<{
        success: false;
        error: string;
        message: string;
    }, 500, "json">)>;
    deleteProfile: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, 200, "json">) | (Response & import("hono").TypedResponse<{
        success: false;
        error: string;
        message: string;
    }, 404, "json">)>;
    saveProfile: (c: Context) => Promise<(Response & import("hono").TypedResponse<{}, 200, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 500, "json">)>;
};
export default _default;
//# sourceMappingURL=profile.controller.d.ts.map