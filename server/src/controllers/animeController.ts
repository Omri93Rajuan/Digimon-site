import express, { IRouter, Request, Response } from "express";
import {
  addAnime,
  getAllAnimes,
  getAnimeById,
  updateAnime,
  deleteAnime,
} from "../services/animeService";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const animes = await getAllAnimes();
    res.json(animes);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const anime = await getAnimeById(req.params.id);
    res.json(anime);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const anime = await addAnime(req.body);
    res.status(201).json(anime);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedAnime = await updateAnime(req.params.id, req.body);
    res.json(updatedAnime);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteAnime(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
