import { Context } from "hono";
declare const _default: {
    me: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        error: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        safeUser: {
            id: string;
            email: string;
            userType: "admin" | "employee" | "client";
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
        };
        profile: {
            id: number;
            userId: string;
            firstName: string | null;
            lastName: string | null;
            phoneNumber: string | null;
            birthDate: string | null;
            gender: "male" | "female" | "other" | "prefer_not_to_say" | null;
            address: string | null;
            photoUrl: string | null;
        };
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
};
export default _default;
//# sourceMappingURL=user.controller.d.ts.map