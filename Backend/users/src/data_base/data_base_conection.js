import { Sequelize } from "sequelize";
require ('dotenv').config()

const db_host = process.env.DB_HOST;
const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_port = process.env.DB_PORT;
const db_password = process.env.DB_PASSWORD;


//https://sequelize.org/docs/v6/getting-started/



//___________________Constante de conexion____________________
const sequelize = new Sequelize( db_name , db_user, db_password, {

    host: db_host,
    dialect: 'mysql'
});

//___________________Test teh connection_______________________

try{
    await sequelize.authenticate();
    console.log("The connection succed 0_0");
} catch (error){
    console.log("There was a problem in the conection ~_~", error);
};

//__________________sincronize tables__________________________

try{
    await sequelize.sync({alter:true});
    console.log("The models are sincronized 0_0 ")
}catch(error){
    console.log("Sequielize sync failed ~_~: ", error)
};



export default sequelize; 
