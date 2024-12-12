import express, { IRouter, Request, Response } from "express";
import {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../services/order.service";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await getOrderById(req.params.id);
    res.json(order);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await addOrder(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedOrder = await updateOrder(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

// מחיקת הזמנה
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteOrder(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
