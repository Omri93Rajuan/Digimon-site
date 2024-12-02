import express, { IRouter, NextFunction, Request, Response } from "express";
import usersContoller from "../controllers/usersContoller";
import digimonsController from "../controllers/digimonsController";
import animeController from "../controllers/animeController";
import authController from "../controllers/authController";

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
