import express from 'express';
import { get_user_by_id, get_users, update_user, delete_user, create_user, login } from '../controllers/controllers_users.js';





const router = express.Router();


router.get('/',get_users );
router.get('/:id', get_user_by_id);

router.post('/create', create_user);
router.put('/update/:id', update_user);
router.delete('/delete/:id', delete_user);


router.post('/login', login);



export default router;
