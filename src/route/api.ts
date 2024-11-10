import { UserController } from "./../controller/user-controller";
import { authMiddleware } from "./../middleware/auth-middleware";
import express from "express";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//USER API
apiRouter.get("/api/users/current", UserController.get);
