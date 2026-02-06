import { Context } from "hono";
declare const _default: {
    getOrganization: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        error: string;
    }, 400, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        userId: string;
        email: string | null;
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
    }, 200, "json">) | (Response & import("hono").TypedResponse<never, 500, "json">)>;
    createOrganization: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        error: string;
    }, 400, "json">) | (Response & import("hono").TypedResponse<{
        userId: string;
        email: string | null;
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
    }, 201, "json">) | (Response & import("hono").TypedResponse<never, 500, "json">)>;
    updateOrganization: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        userId: string;
        email: string | null;
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
    }, 200, "json">) | (Response & import("hono").TypedResponse<{
        error: string;
    }, 400, "json">) | (Response & import("hono").TypedResponse<never, 500, "json">)>;
    deleteOrganization: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        error: string;
    }, 400, "json">) | (Response & import("hono").TypedResponse<{}, 201, "json">) | (Response & import("hono").TypedResponse<never, 500, "json">)>;
};
export default _default;
//# sourceMappingURL=organization.controller.d.ts.map