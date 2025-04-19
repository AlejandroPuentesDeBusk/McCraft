import express from 'express';
import { get_ingredients, get_ingredient_by_id, delete_ingredient, create_ingredient, update_ingredient } from '../controllers/ingredients_controllers.js';


const router = express.Router();


//ingredients____________________________________________________
router.get('/ingredients',get_ingredients);
router.get('/ingredient/:id', get_ingredient_by_id);

router.post('/ingredients/create', create_ingredient);
router.put('/ingredients/update/:id', update_ingredient);
router.delete('/ingredients/delete/:id', delete_ingredient);


//products____________________________________________________-


export default router;
