import Client from '../models/client_model.js'
import Address from '../models/address_model.js';
import sequelize from '../data_base/data_base_conection.js';


import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();

//_________________________________


const client_functions= {


//Para que cuando haya muchos registros no truene 
//pero es mas como paginacion si puedes seguir obteniendo los que quieras
//Cuando hagas el request ahi mismo le metes la cantidad
    async get_clients({ limit = 40, offset = 0}  = {} ) {

        limit = parseInt(limit);
        offset = parseInt(offset);

        try{

            const clients = await Client.findAll({attributes: limit,offset,});
            return clients;

        }catch(error){

            console.log("There was an error getting the clients ~_~ try again");
            //Esto es para que se siga pasando a las siguientes funciones el error
            throw error;
        
        }
    },

    //_______________________________________________________________________



    async get_client_ById(id) {

        try{

    
            const client = await Client.findByPk(id);
          
            if (!client) {
              throw new Error(`Client ${id} doesn't exist ~_~`);
            }
          
            return client;


        }catch(error){

            console.log(`There was an error getting the client: ${id} ~_~ try again`);
          
            throw error;

        }

      },

      


      


    //_______________________________




}

export default client_functions;