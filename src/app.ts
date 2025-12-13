import { Hono } from "hono";
import { errorMiddleware } from "@/middleware/error.middleware";
import router from "./routes";
import { containerMiddleware, Variables } from "./di/di";

const app = new Hono<{ Variables: Variables }>();

app.use("*", containerMiddleware);
app.use("*", errorMiddleware);
app.route("/", router);

export default app;
