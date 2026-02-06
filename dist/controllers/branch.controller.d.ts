import { Context } from "hono";
declare const _default: {
    create: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        email: string | null;
        code: string | null;
        id: number;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        name: string;
        phoneNumber: string | null;
        address: string | null;
        organizationId: number;
    }, 201, "json">>;
    findAll: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        email: string | null;
        code: string | null;
        id: number;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        name: string;
        phoneNumber: string | null;
        address: string | null;
        organizationId: number;
    }[], import("hono/utils/http-status").ContentfulStatusCode, "json">>;
    findById: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        email: string | null;
        code: string | null;
        id: number;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        name: string;
        phoneNumber: string | null;
        address: string | null;
        organizationId: number;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
    update: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        email: string | null;
        code: string | null;
        id: number;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        name: string;
        phoneNumber: string | null;
        address: string | null;
        organizationId: number;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
    remove: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        message: string;
    }, 201, "json">>;
    createSchedule: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        id: number;
        branchId: number;
        dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
        openTime: string;
        closeTime: string;
        isClosed: boolean;
    }, 201, "json">>;
    getSchedule: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        id: number;
        branchId: number;
        dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
        openTime: string;
        closeTime: string;
        isClosed: boolean;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
    updateSchedule: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        id: number;
        branchId: number;
        dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
        openTime: string;
        closeTime: string;
        isClosed: boolean;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
    deleteSchedule: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        message: string;
    }, 201, "json">>;
};
export default _default;
//# sourceMappingURL=branch.controller.d.ts.map