import { Context } from 'hono';
export declare const errorMiddleware: (c: Context, next: Function) => Promise<(Response & import("hono").TypedResponse<{
    error: string;
}, any, "json">) | undefined>;
//# sourceMappingURL=error.middleware.d.ts.map