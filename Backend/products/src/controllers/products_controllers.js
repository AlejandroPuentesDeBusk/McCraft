import product_functions from "../functions/product_functions.js";

export const get_products = async (req, res, next) => {

  try {

    const products = await product_functions.get_products();
    res.status(200).json(products);
  

} catch (error) {
    next(error);
  }
};


//_______________________________________________________________
export const get_product_by_id = async (req, res, next) => {


  try {

    const { id } = req.params;

    const product = await product_functions.get_product_by_id(id);
    res.status(200).json(product);


  } catch (error) {
    next(error);
  }
};



//_______________________________________________________________
export const create_product = async (req, res, next) => {


  try {


    const product_data = req.body;

    const newProduct = await product_functions.create_product(product_data);
    res.status(201).json(newProduct);

    
  } catch (error) {
    next(error);
  }
};



//_______________________________________________________________
export const update_product = async (req, res, next) => {


  try {


    const { id } = req.params;
    const product_data = req.body;


    const updated = await product_functions.update_product(id, product_data);
    res.status(200).json(updated);


  } catch (error) {
    next(error);
  }
};


//_______________________________________________________________
export const delete_product = async (req, res, next) => {

  try {

    const { id } = req.params;


    const deleted = await product_functions.delete_product(id);
    res.status(200).json(deleted);


  } catch (error) {
    next(error);
  }
};