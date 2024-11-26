import express, { IRouter, NextFunction, Request, Response }  from 'express'
import dataContoller from "../src/controllers/dataContoller"
import authController from "../src/controllers/authController"
import { verifyAdmin, verifyUser } from '../helpers/jwt';
import { handleError } from '../utils/ErrorHandle';

const router:IRouter = express.Router()

router.use("/data",verifyUser as NextFunction,dataContoller );
router.use("/admin-role",verifyAdmin as NextFunction,dataContoller );
router.use("/auth",authController );

router.use((req:Request,res:Response)=>{
handleError(res,404,"Miki is not found at Nimrodi Tower")
})


export default router