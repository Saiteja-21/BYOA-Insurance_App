import express from "express";
import { addClient ,getclients} from "../controllers/client.js";

const router=express.Router();

router.post('/post',addClient) 
router.get('/get',getclients);

export default router