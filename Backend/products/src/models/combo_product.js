import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';
import Combo from './Combo.js';
import Product from './Product.js';

class ComboProduct extends Model {}

ComboProduct.init(
  
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  },
  { sequelize, modelName: 'ComboProduct' }
  
);

Combo.belongsToMany(Product, { through: ComboProduct, foreignKey: 'combo_id' });
Product.belongsToMany(Combo,  { through: ComboProduct, foreignKey: 'product_id' });

export default ComboProduct;
