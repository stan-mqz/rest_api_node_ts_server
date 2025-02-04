import express from 'express'
import router from './routes'
import db from './config/db'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'

//Conection
export const connectDataBase = async () => {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta.bold('Conexion exitosa'))
    } catch (error) {
        console.log(colors.red.bold('Error al conectar'))
    }
}

connectDataBase()

const server = express()
server.use(express.json())

//Endpoint /products/lo que tenga el resto de la ruta
server.use('/products', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server