import { Hono } from "hono";
import { Variables } from "./di/di";
declare const app: Hono<{
    Variables: Variables;
}, import("hono/types").BlankSchema, "/">;
export default app;
//# sourceMappingURL=app.d.ts.map