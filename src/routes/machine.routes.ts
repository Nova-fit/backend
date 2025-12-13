import { Hono } from "hono";
import machineController from "@/controllers/machine.controller";

const machineRoutes = new Hono();

machineRoutes.post("/", machineController.create);
machineRoutes.get("/", machineController.findAll);
machineRoutes.get("/:id", machineController.findById);
machineRoutes.put("/:id", machineController.update);
machineRoutes.delete("/:id", machineController.remove);

export default machineRoutes;
