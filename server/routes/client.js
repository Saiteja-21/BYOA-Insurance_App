import express from "express";
import { addClient ,getclients,getByid,updateclient,updateclient2, deleteclient} from "../controllers/client.js";

const router=express.Router();

router.post('/post',addClient) 
router.get('/get',getclients);
router.get('/get/:id',getByid);
router.delete('/delete/:id',deleteclient)
router.put('/update/:id',updateclient)
router.put('/updaterequest',updateclient2)

export default router