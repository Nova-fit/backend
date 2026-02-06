import { Context } from "hono";
declare const _default: {
    assign: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        userId: string;
        id: number;
        roleId: number;
        branchId: number;
        isCurrentBranch: boolean;
        joinedAt: string;
        leftAt: string | null;
    }, 201, "json">>;
    transfer: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        userId: string;
        id: number;
        fromBranchId: number;
        toBranchId: number;
        transferredBy: string | null;
        reason: string | null;
        transferredAt: string;
    }, 201, "json">>;
    getBranchUsers: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        userId: string;
        id: number;
        roleId: number;
        branchId: number;
        isCurrentBranch: boolean;
        joinedAt: string;
        leftAt: string | null;
    }[], import("hono/utils/http-status").ContentfulStatusCode, "json">>;
    getUserHistory: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        userId: string;
        id: number;
        fromBranchId: number;
        toBranchId: number;
        transferredBy: string | null;
        reason: string | null;
        transferredAt: string;
    }[], import("hono/utils/http-status").ContentfulStatusCode, "json">>;
    getCurrentBranch: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        message: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        userId: string;
        id: number;
        roleId: number;
        branchId: number;
        isCurrentBranch: boolean;
        joinedAt: string;
        leftAt: string | null;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
};
export default _default;
//# sourceMappingURL=user-branch.controller.d.ts.map