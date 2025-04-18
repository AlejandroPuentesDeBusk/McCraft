import Client from '../models/client_model.js'
import Address from '../models/address_model.js';
import sequelize from '../data_base/data_base_conection.js';


import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();

//_________________________________


const address_functions= {

    async get_addresses(){

        try{

            const addresses = await Address.findAll();

            return addresses;
        }catch(error){

            console.log(`There was an error getting the addresses ~_~ try again`)
            throw error;
        }

    }

}

export default address_functions;