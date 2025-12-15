import { Hono } from "hono";
import authController from "@/controllers/auth.controller";

import { zValidator } from "@hono/zod-validator";
import {
    loginSchema,
    refreshTokenSchema,
    registerSchema,
} from "@/middleware/auth.validators";

const auth = new Hono();

auth.post(
    "/register",
    zValidator("json", registerSchema),
    authController.register,
)
    .post("/login", zValidator("json", loginSchema), authController.login)
    .post(
        "/logout",
        zValidator("json", refreshTokenSchema),
        authController.logout,
    )
    .post(
        "/refresh",
        zValidator("json", refreshTokenSchema),
        authController.refresh,
    );

export default auth;
