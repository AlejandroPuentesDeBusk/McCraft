import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';
import Product from './product_model.js';
import Ingredient from './ingredient_model.js';
class ProductIngredient extends Model {}

ProductIngredient.init(
  {
    quantity: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 1 } 
  },
  { sequelize, modelName: 'ProductIngredient' }
);


Product.belongsToMany(Ingredient, { through: ProductIngredient, foreignKey: 'product_id' });
Ingredient.belongsToMany(Product, { through: ProductIngredient, foreignKey: 'ingredient_id' });

export default ProductIngredient;
