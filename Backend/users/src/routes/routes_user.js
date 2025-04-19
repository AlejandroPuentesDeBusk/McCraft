import express from 'express';
import { get_user_by_id, get_users, update_user, delete_user, create_user, login } from '../controllers/controllers_users.js';

import { authenticate_token } from '../middlewares/token_auth.js';




const router = express.Router();


//No voy a proteger ni el login ni el create user


router.get('/', authenticate_token, get_users );
router.get('/:id', authenticate_token, get_user_by_id);
//esta sin proteccion
router.post('/create', create_user);

router.put('/update/:id', authenticate_token, update_user);
router.delete('/delete/:id',authenticate_token, delete_user);


router.post('/login', login);



export default router;
