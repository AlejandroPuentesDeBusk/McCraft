import { DataTypes, Model } from 'sequelize';
import sequelize from '../data_base/data_base_conection.js';
import Client from './client_model.js';

class Address extends Model {

  get_full_address() {
    return [
      this.street,
      this.zone,
      this.city,
      this.state,
      this.zip_code
    ]
      .filter(Boolean)
      .join(', ');
  }
}

Address.init(
    
  {
    address_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: 'client_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },

    street:   { type: DataTypes.STRING(60), allowNull: false },
    zone:     { type: DataTypes.STRING(60), allowNull: true  },
    city:     { type: DataTypes.STRING(40), allowNull: false },
    state:    { type: DataTypes.STRING(40), allowNull: false },
    zip_code: { type: DataTypes.STRING(15), allowNull: false },

    label: {
      type: DataTypes.STRING(20),  
      allowNull: true
    },

    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { sequelize}
);



Client.hasMany(Address, {
  foreignKey: 'client_id',
  as: 'addresses'
});

Address.belongsTo(Client, {
  foreignKey: 'client_id',
  as: 'client'
});

export default Address;
