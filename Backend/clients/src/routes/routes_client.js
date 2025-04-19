import express from 'express';
import { get_client_by_id, get_clients } from '../controllers/controllers_clients.js';
import { get_addresses, delete_address, update_address, create_address } from '../controllers/controllers_address.js';
import { create_client, delete_client, update_client } from '../controllers/controllers_clients.js';



const router = express.Router();

//_____________________________Clients ___________________________


router.get('/',get_clients );
router.get('/client/:id', get_client_by_id);

router.post('/create',create_client);
router.put('/update/:id', update_client);
router.delete('/delete/:id', delete_client);


//_____________________________Addresses ___________________________

router.get('/addresses', get_addresses);

router.post('/address/create', create_address);
router.put('/address/update/:id',update_address);
router.delete('/address/delete/:id', delete_address);




export default router;
