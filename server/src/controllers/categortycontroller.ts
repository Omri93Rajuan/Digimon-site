import express, { IRouter, Request, Response } from "express";
import {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const animes = await getAllCategories();
    res.json(animes);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const anime = await getCategoryById(req.params.id);
    res.json(anime);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const anime = await addCategory(req.body);
    res.status(201).json(anime);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedAnime = await updateCategory(req.params.id, req.body);
    res.json(updatedAnime);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteCategory(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
