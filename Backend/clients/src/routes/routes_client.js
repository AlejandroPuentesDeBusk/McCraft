import express from 'express';
import { get_client_by_id, get_clients } from '../controllers/controllers_clients.js';
import { get_addresses } from '../controllers/controllers_address.js';
import { create_client, delete_client, update_client } from '../controllers/controllers_clients.js';



const router = express.Router();


router.get('/',get_clients );
router.get('/client/:id', get_client_by_id);

router.post('/create',create_client);
router.put('/update/:id', update_client);
router.delete('/delete/:id', delete_client);

router.get('/addresses', get_addresses);




export default router;
