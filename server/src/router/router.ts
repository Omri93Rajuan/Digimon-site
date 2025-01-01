import express, { IRouter, NextFunction, Request, Response } from "express";
import usersContoller from "../controllers/users.contoller";
import productController from "../controllers/product.controller";
import categortyController from "../controllers/categortycontroller";
import orderController from "../controllers/order.controller";

import authController from "../controllers/auth.controller";

import { verifyAdmin, verifyUser } from "../middlewares/jwt";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.use("/users", usersContoller);
router.use("/product", productController);
router.use("/categorty", categortyController);
router.use("/orders", orderController);
router.use("/auth", authController);

// Admin-only routes
router.use("/admin-role/users", verifyAdmin, usersContoller);
router.use("/admin-role/product", verifyAdmin, productController);
router.use("/admin-role/categorty", verifyAdmin, categortyController);
router.use("/admin-role/orders", verifyAdmin, orderController);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(handleError(res, 404, "The requested resource was not found."));
});
export default router;
