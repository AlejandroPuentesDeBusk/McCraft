import client_functions from '../functions/client_functions.js'

//el next es para agarrar el error del servicio, ahi que ir aventando el mismo error
//asi sale en postman directo sin tener que ver los logs

export const get_clients= async(req, res, next) => {

    try{

        //para hacer paginado pos si hay muchos
        const{limit, offset} = req.query;

        const clients = await client_functions.get_clients({limit, offset});

        res.status(200).json(clients);

    } catch(error){
        next(error)
    }
}

//__________________________________________________________________

export const get_client_by_id= async(req, res, next) => {



    try{

        const {id} = req.params;
        const {fields} = req.query;

        const client = await client_functions.get_client_ById(id, fields);

        res.status(200).json(client);

    } catch(error){
        
        next(error)
    }
}