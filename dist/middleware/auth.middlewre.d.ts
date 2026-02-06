import { Context } from 'hono';
export declare const authMiddleware: (c: Context, next: Function) => Promise<(Response & import("hono").TypedResponse<{
    error: string;
}, 401, "json">) | undefined>;
//# sourceMappingURL=auth.middlewre.d.ts.map