import express, { IRouter, NextFunction, Request, Response } from "express";
import usersContoller from "../controllers/users.contoller";
import digimonsController from "../controllers/product.controller";
import animeController from "../controllers/categort.controller";
import authController from "../controllers/auth.controller";

import { verifyAdmin, verifyUser } from "../middlewares/jwt";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.use("/users", usersContoller);
router.use("/digimons", digimonsController);
router.use("/animes", animeController);
router.use("/auth", authController);

// Admin-only routes
router.use("/admin-role/users", verifyAdmin, usersContoller);
router.use("/admin-role/digimons", verifyAdmin, digimonsController);
router.use("/admin-role/animes", verifyAdmin, animeController);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(handleError(res, 404, "The requested resource was not found."));
});

export default router;
