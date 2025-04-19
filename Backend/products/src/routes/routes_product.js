import express from 'express';
import { get_ingredients, get_ingredient_by_id, delete_ingredient, create_ingredient, update_ingredient } from '../controllers/ingredients_controllers.js';

import { get_products, get_product_by_id, delete_product, update_product, create_product } from '../controllers/products_controllers.js';

const router = express.Router();


//ingredients____________________________________________________
router.get('/ingredients',get_ingredients);
router.get('/ingredient/:id', get_ingredient_by_id);

router.post('/ingredients/create', create_ingredient);
router.put('/ingredients/update/:id', update_ingredient);
router.delete('/ingredients/delete/:id', delete_ingredient);


//products____________________________________________________-



router.get('/product',get_products);
router.get('/gproduct:id',get_product_by_id);
router.post('/product/create',create_product);
router.put('/product/update/:id',update_product);
router.delete('/product/delete/:id',delete_product);









export default router;
