import express,{json, urlencoded, Response,Request, NextFunction} from "express"
import cors from "cors"
import helmet from "helmet"
import logger  from "morgan"
import createError from "http-errors"
import router  from "../routes/page"
import cookieParser from "cookie-parser"
import { IRequest } from "../interface/IRequest"

const app = express()

app.use(cors())
app.use(helmet())
app.use(json())
app.use(urlencoded({extended:true}))
app.use(logger("dev"))
app.use(cookieParser())
app.use(router)


app.use((req:IRequest, res, next) => {
    next(createError(404));
  });
app.use((err:createError.HttpError, req: IRequest, res: Response, next: NextFunction) =>{
  try{
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
  }catch(error){
    console.log(error)
  }
})

export default app
