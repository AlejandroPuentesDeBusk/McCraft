import express from 'express';
import { get_ingredients, get_ingredient_by_id, delete_ingredient, create_ingredient, update_ingredient_s } from '../controllers/ingredients_controllers.js';

import { get_products, get_product_by_id, delete_product, update_product, create_product, set_product_ingredients } from '../controllers/products_controllers.js';

import { list_all, list_by_product, add_ingredient, update_ingredient, remove_ingredient } from '../controllers/associations_tables_controllers/product_ingredients_controllers.js';


const router = express.Router();


//ingredients____________________________________________________
router.get('/ingredients',get_ingredients);
router.get('/ingredient/:id', get_ingredient_by_id);

router.post('/ingredients/create', create_ingredient);
router.put('/ingredients/update/:id', update_ingredient_s);
router.delete('/ingredients/delete/:id', delete_ingredient);


//products____________________________________________________-



router.get('/product',get_products);
router.get('/gproduct/:id',get_product_by_id);


router.post('/product/create',create_product);
router.put('/product/update/:id',update_product);
router.delete('/product/delete/:id',delete_product);



//_____product_ingredients_____________________________


router.get('/product/ingredient',list_all);
router.get('/product/ingredient/list/:id', list_by_product);



router.post('/product/ingredients/:id', set_product_ingredients);
router.post('/product/ingredient/add/:id',  add_ingredient);


router.put('/product/ingredient/update/:id/:ingredientId', update_ingredient);
router.delete('/product/ingredient/remove/:id/:ingredientId', remove_ingredient);







export default router;
