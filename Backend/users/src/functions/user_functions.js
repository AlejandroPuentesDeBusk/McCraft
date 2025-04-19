import User from "../models/model_user.js";
import sequelize from '../data_base/data_base_conection.js';
import amqp from 'amqplib';


import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
import { update_client } from "../../../clients/src/controllers/controllers_clients.js";
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

      //____________________________________________________________________________

      async create_user(user){

        try{

            const user_exist = await User.findOne( {where: {email: user.email}})

            if (user_exist){
                throw new Error(`The user ${user.email} already exists ~_~`)
            }

            const new_user = await User.create(user)

            return new_user;

        }catch(error){

            console.log("There was an error crearing the user ~_~")
            throw error

        }

      },
      


    //_____________________________________________________--

    async update_user(id, user_data){

      try{

        const user = await User.findByPk(id);

        if (!user){

          throw new Error(`The user with id : ${id} doesn't exist ~_~`);
        }

        user.name = user_data.name  ?? user.name;
        user.last_anme = user_data.last_anme ?? user.last_anme;
        user.email = user_data.email ?? user.email;
        user.password = user_data.password ?? user.password;


        user.image_url = user_data.image_url ?? user.image_url;

        user.role = user_data.role ?? user.role




        await user.save();
        return user

      }catch(error){
        console.log(`There was an error updating the user with id: ${id} ~_~`, error)
        throw error;


      }
    },


    //_________________________________________________________________________


    async delete_user(id){

      try{

        const user = await User.findByPk(id);

        if(!user){
          throw new Error(`User with id ${id} doesn't exist ~_~`);
        }

        user.is_active = false
        await user.save();

        return user;


      }catch(error){

        console.log(`There was ana error deleting the user ~_~`, error)
        throw error;
      }
    }


}

export default user_functions;