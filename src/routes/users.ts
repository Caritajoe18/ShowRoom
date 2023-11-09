import express from "express";
import {login, register} from '../controller/user'
 
const router = express.Router();

/* GET users listing. */
router.post("/Register", register );
router.post("/Login", login);

export default router;
