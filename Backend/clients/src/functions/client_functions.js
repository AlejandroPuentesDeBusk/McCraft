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

            const clients = await Client.findAll({attributes:
                                                {exclude: ['password']},
                                                limit,
                                                offset,
                                            });
            return clients;

        }catch(error){

            console.log("There was an error getting the clients ~_~ try again");
            //Esto es para que se siga pasando a las siguientes funciones el error
            throw error;
        
        }
    },

    //_______________________________________________________________________



    async get_client_ById(id, fields = null) {

        try{

            let attributes;

            if (fields) {
              attributes = fields
                .split(',')
                .map((f) => f.trim())
                .filter(Boolean);
    
              attributes = attributes.filter((f) => f.toLowerCase() !== 'password');

            } else {

              attributes = { exclude: ['password'] };
            }
          
    
            const client = await Client.findByPk(id, { attributes });
          
            if (!client) {
              throw new Error(`Client ${id} doesn't exist ~_~`);
            }
          
            return client;


        }catch(error){

            console.log(`There was an error getting the client: ${id} ~_~ try again`);
          
            throw error;

        }

      },

      


      async create_user(user){

        try{

            const user_exist = await User.findOne( {where: {email: user.email}})

            if (user_exist){
                throw new Error(`The user ${user.email} already exists ~_~`)
            }

            const new_user = await User.create(user)

        }catch(error){

            console.log("There was an error crearing the user ~_~")
            throw error

        }

      }
      


    //_______________________________




}

export default client_functions;