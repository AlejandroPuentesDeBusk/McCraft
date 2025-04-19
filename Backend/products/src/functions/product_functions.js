import Product from '../models/product_model.js';
import ProductSize from '../models/associations/product_size_model.js';


const product_functions = {

  //_________________________________________________________
  async get_products() {

    try {

      const products = await Product.findAll({
        where: { is_active: true },
        include: [{ model: ProductSize, as: 'sizes' }]
      });

      return products;

    } catch (error) {

      console.error('Error getting products ~_~', error);
      throw error;
    }
  },


  //____________________________________________________________
  async get_product_by_id(id) {

    try {

      const product = await Product.findByPk(id, {

        include: [{ model: ProductSize, as: 'sizes' }]
      });

      if (!product) {
        throw new Error(`Product with id ${id} does not exist`);
      }

      return product;

    } catch (error) {

      console.error(`Error getting product ${id}: ~_~`, error);
      throw error;
    }
  },

  //__________________________________________________________________
  async create_product(product_data) {

    try {
      
      const exists = await Product.findOne({ where: { name: product_data.name } });
      if (exists) {

        throw new Error(`The product '${product_data.name}' already exists ~_~`);
      }

      // Crear registro base
      const { sizes, ...baseData } = product_data;
      const newProduct = await Product.create(baseData);


      // Si vienen tamaños, crear variantes
      if (Array.isArray(sizes) && sizes.length) {

        const withProductId = sizes.map(s => ({
          ...s,
          product_id: newProduct.product_id
        }));

        await ProductSize.bulkCreate(withProductId);

      }

      // Devolver con sus tamaños porque hay varios saaaaaahhhhhhhh
      return await Product.findByPk(newProduct.product_id, {
        include: [{ model: ProductSize, as: 'sizes' }]
      });

    } catch (error) {

      console.error('Error creating product: ~_~', error);
      throw error;

    }
  },

  //________________________________________________________
  async update_product(id, product_data) {

    try {

      const product = await Product.findByPk(id, {
        include: [{ model: ProductSize, as: 'sizes' }]
      });

      if (!product) {
        throw new Error(`Product with id ${id} does not exist ~_~`);
      }

      const { sizes, ...baseData } = product_data;

      // Actualizar campos base
      Object.assign(product, baseData);
      await product.save();

      // Si se envían tamaños, reemplazamos all sizes");
      if (Array.isArray(sizes)) {
        // Borrar viejos tamaños
        await ProductSize.destroy({ where: { product_id: id } });
        // Crear los nuevos
        const toCreate = sizes.map(s => ({
          ...s,
          product_id: id
        }));
        await ProductSize.bulkCreate(toCreate);
      }


      return await Product.findByPk(id, {
        include: [{ model: ProductSize, as: 'sizes' }]
      });

    } catch (error) {

      console.error(`Error updating product ${id}: ~_~`, error);
      throw error;
    }
  },

  //________________________________________________________________
  async delete_product(id) {

    try {

      const product = await Product.findByPk(id);


      if (!product) {

        throw new Error(`Product with id ${id} does not exist`);
      }

      product.is_active = false;


      await product.save();
      return product;


    } catch (error) {

      console.error(`Error deleting product ${id}: ~_~`, error);
      throw error;
    }
  }
};

export default product_functions;