import { Hono } from "hono";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import profileRoutes from "./profile.routes";
import organizationRoutes from "./organization.routes";
import branchRoutes from "./branch.routes";
import userBranchRoutes from "./user-branch.routes";

const router = new Hono();

router.route("/auth", authRoutes);
router.route("/users", userRoutes);
router.route("/profile", profileRoutes);
router.route("/organizations", organizationRoutes);
router.route("/branches", branchRoutes);
router.route("/user-branches", userBranchRoutes);

export default router;
