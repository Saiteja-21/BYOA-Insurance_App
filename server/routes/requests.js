import express from 'express';
import {addRequest,getrequests,deleterequest} from '../controllers/requests.js'
const router=express.Router();

router.post('/add',addRequest);
router.get('/get',getrequests);
router.delete('/delete/:id',deleterequest)

export default router