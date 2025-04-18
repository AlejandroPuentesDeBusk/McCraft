import User from "../models/model_user.js";
import sequelize from '../data_base/data_base_conection.js';


import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();

//_________________________________


const user_functions= {


//Para que cuando haya muchos registros no truene 
//pero es mas como paginacion si puedes seguir obteniendo los que quieras
//Cuando hagas el request ahi mismo le metes la cantidad
    async get_users({ limit = 40, offset = 0}  = {} ) {

        limit = parseInt(limit);
        offset = parseInt(offset);

        try{

            const users = await User.findAll({attributes:
                                                {exclude: ['password']},
                                                limit,
                                                offset,
                                            });
            return users;

        }catch(error){

            console.log("There was an error getting the users ~_~ try again");
            //Esto es para que se siga pasando a las siguientes funciones el error
            throw error;
        
        }
    },

    //_______________________________________________________________________



    async getUserById(id, fields = null) {

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
          
    
            const user = await User.findByPk(id, { attributes });
          
            if (!user) {
              throw new Error(`User ${id} doesn't exist ~_~`);
            }
          
            return user;


        }catch(error){

            console.log(`There was an error getting the user: ${id} ~_~ try again`);
          
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

export default user_functions;