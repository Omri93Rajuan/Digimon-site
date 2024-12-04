import express, { IRouter, Request, Response } from "express";
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByCall,
} from "../services/usersService";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get(
  "/getUsersByCall",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await getUsersByCall(page, limit);
      res.json(result);
    } catch (error: any) {
      handleError(res, error.status || 500, error.message);
    }
  }
);
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await addUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteUser(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
