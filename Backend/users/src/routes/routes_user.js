import express from 'express';
import { get_user_by_id, get_users } from '../controllers/controllers_users.js';





const router = express.Router();


router.get('/',get_users );
router.get('/:id', get_user_by_id);




export default router;
