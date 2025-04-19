// src/models/index.js
import sequelize from '../data_base/data_base_conection.js';

import Product from './product_model.js';
import ProductSize from './associations/product_size_model.js'
import Ingredient from './ingredient_model.js';
import ProductIngredient from './associations/product_ingredient.js'
import Combo from './combo_model.js';
import ComboProduct from './associations/combo_product.js'
import CustomBurger from './custom_model.js';
import CustomBurgerIngredient from './associations/cutomB_ingredient.js'



// —— Asociaciones Products — Sizes
Product.hasMany(ProductSize, { foreignKey: 'product_id', as: 'sizes' });
ProductSize.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });



// —— Asociaciones Products — Ingredients (receta)

Product.belongsToMany(Ingredient, {
  through: ProductIngredient,
  foreignKey: 'product_id',
  as: 'ingredients'
});

Ingredient.belongsToMany(Product, {
  through: ProductIngredient,
  foreignKey: 'ingredient_id',
  as: 'products'
});



// —— Asociaciones Combo — Product

Combo.belongsToMany(Product, {
  through: ComboProduct,
  foreignKey: 'combo_id',
  as: 'products'
});

Product.belongsToMany(Combo, {
  through: ComboProduct,
  foreignKey: 'product_id',
  as: 'combos'
});



// —— Asociaciones CustomBurger — Ingredient


CustomBurger.belongsToMany(Ingredient, {
  through: CustomBurgerIngredient,
  foreignKey: 'custom_id',
  as: 'ingredients'
});


Ingredient.belongsToMany(CustomBurger, {
  through: CustomBurgerIngredient,
  foreignKey: 'ingredient_id',
  as: 'customBurgers'
});



// puedo meter esto por si acaso ~___~ ya tengo siueño 
// await sequelize.sync({ alter: true });

export {
  sequelize,
  Product,
  ProductSize,
  Ingredient,
  ProductIngredient,
  Combo,
  ComboProduct,
  CustomBurger,
  CustomBurgerIngredient
};
