import express, {Request, Response, NextFunction} from  'express';


const router = express.Router();

router.get("/register",(req:Request, res:Response)=>{
    res.render("Register")
})


router.get("/login",(req:Request, res:Response)=>{
    res.render("login")
})

export default router