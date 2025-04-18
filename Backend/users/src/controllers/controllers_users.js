import user_functions from "../functions/user_functions.js";



//el next es para agarrar el error del servicio, ahi que ir aventando el mismo error
//asi sale en postman directo sin tener que ver los logs

export const get_users= async(req, res, next) => {

    try{

        //para hacer paginado pos si hay muchos
        const{limit, offset} = req.query;

        const users = await user_functions.get_users({limit, offset});

        res.status(200).json(users);

    } catch(error){
        next(error)
    }
}

//__________________________________________________________________

export const get_user_by_id= async(req, res, next) => {



    try{

        const {id} = req.params;
        const {fields} = req.query;

        const user = await user_functions.getUserById(id, fields);

        res.status(200).json(user);

    } catch(error){
        
        next(error)
    }
}