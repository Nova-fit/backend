import { Context } from "hono";
declare const _default: {
    create: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        status: "available" | "in_use" | "maintenance" | "out_of_service";
        id: number;
        createdAt: string;
        updatedAt: string;
        brand: string | null;
        name: string;
        branchId: number;
        serialNumber: string | null;
        model: string | null;
        category: string | null;
        purchaseDate: string | null;
        warrantyExpiryDate: string | null;
        notes: string | null;
    }, 201, "json">>;
    findAll: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        status: "available" | "in_use" | "maintenance" | "out_of_service";
        id: number;
        createdAt: string;
        updatedAt: string;
        brand: string | null;
        name: string;
        branchId: number;
        serialNumber: string | null;
        model: string | null;
        category: string | null;
        purchaseDate: string | null;
        warrantyExpiryDate: string | null;
        notes: string | null;
    }[], import("hono/utils/http-status").ContentfulStatusCode, "json">>;
    findById: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        status: "available" | "in_use" | "maintenance" | "out_of_service";
        id: number;
        createdAt: string;
        updatedAt: string;
        brand: string | null;
        name: string;
        branchId: number;
        serialNumber: string | null;
        model: string | null;
        category: string | null;
        purchaseDate: string | null;
        warrantyExpiryDate: string | null;
        notes: string | null;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
    update: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        status: "available" | "in_use" | "maintenance" | "out_of_service";
        id: number;
        createdAt: string;
        updatedAt: string;
        brand: string | null;
        name: string;
        branchId: number;
        serialNumber: string | null;
        model: string | null;
        category: string | null;
        purchaseDate: string | null;
        warrantyExpiryDate: string | null;
        notes: string | null;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
    remove: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        message: string;
    }, 201, "json">>;
};
export default _default;
//# sourceMappingURL=machine.controller.d.ts.map