import express from 'express';
import { get_ingredients, get_ingredient_by_id, delete_ingredient, create_ingredient, update_ingredient_s } from '../controllers/ingredients_controllers.js';

import { get_products, get_product_by_id, delete_product, update_product, create_product, set_product_ingredients } from '../controllers/products_controllers.js';

import { list_all, list_by_product, add_ingredient, update_ingredient, remove_ingredient } from '../controllers/associations_tables_controllers/product_ingredients_controllers.js';

import { get_combos, get_combo_by_id, delete_combo, update_combo, create_combo, get_combo_full } from '../controllers/combo_controllers.js';

import { list_by_combo, add_product, remove_product, update_quantity, list_all_combos } from '../controllers/associations_tables_controllers/combo_product_controller.js';

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


//________________________________Combos__________________

router.get('/combos',              get_combos);           // GET  /combos
router.get('/combo/:id',           get_combo_by_id);      // GET  /combo/123
router.get('/combos/full/:id', get_combo_full);
router.post('/combos/create',      create_combo);         // POST /combos/create
router.put('/combos/update/:id',   update_combo);         // PUT  /combos/update/123
router.delete('/combos/delete/:id', delete_combo);        


//_____________combo_products___________________________-


router.get('/combos/products',list_all_combos);
router.get('/combos/products/:comboId',list_by_combo);
router.post('/combos/products/add/:comboId',add_product);
router.put('/combos/products/update/:comboId/:productId',update_quantity);
router.delete('/combos/products/remove/:comboId/:productId',remove_product);




export default router;
