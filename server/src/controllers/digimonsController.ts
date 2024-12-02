import express, { IRouter, Request, Response } from "express";
import {
  addDigimon,
  getAllDigimons,
  getDigimonById,
  updateDigimon,
  deleteDigimon,
} from "../services/digimonsService";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const digimons = await getAllDigimons();
    res.json(digimons);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const digimon = await getDigimonById(req.params.id);
    res.json(digimon);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const digimon = await addDigimon(req.body);
    res.status(201).json(digimon);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedDigimon = await updateDigimon(req.params.id, req.body);
    res.json(updatedDigimon);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteDigimon(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
