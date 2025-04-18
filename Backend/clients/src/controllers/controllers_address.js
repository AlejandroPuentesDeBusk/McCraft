import address_functions from "../functions/address_functions.js";

export const get_addresses = async (req, res, next) =>{

    try{

        const addresses = await address_functions.get_addresses();

        res.status(200).json(addresses);


    }catch(error){
        next(error)
    }
}