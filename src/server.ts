import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'


//Conection
export const connectDataBase = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.magenta.bold("Conexion exitosa"));
  } catch (error) {
    console.log(colors.red.bold("Error al conectar"));
    console.log(colors.red.bold(error));
  }
};

connectDataBase();

//Instancia de express
const server = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
  //El valor que te esta enviando la peticion
  /*
    origin: La info de quien envia la peticion
    callback: Permite o negar la conexion
    */
  origin: function (origin, callback) {

    //Si el origen es igual a la variable de entorno, permitimos la conexion
    if (origin === process.env.FRONTEND_URL! ) {
      //Toma dos valores, el primero es un error, y el otro si quieres permitir la conexion

      //No hay errores, por lo tanto, primer parametro null, y el segundo lo indicamos como true
      callback(null, true);
    } else {
      //Al denegar la conexion, pasamos directamente un error para no permitir la conexion
      callback(new Error("Error de CORS"));
    }
  },
};
//Se ejecuta con cada vez que se usa el proyecto
server.use(cors(corsOptions));

server.use(express.json());

//Puedes usar las diferentes opciones para ver diferentes logs
server.use(morgan('dev'))
//Endpoint /products/lo que tenga el resto de la ruta
server.use("/products", router);

//Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
