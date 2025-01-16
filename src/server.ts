import express from 'express'
import router from './routes'
import db from './config/db'

//Conection
const connectDataBase = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log('Conexion exitosa')
    } catch (error) {
        console.log(error)
        console.log('Error al conectar')
    }
}

connectDataBase()

const server = express()

server.use('/products', router)

//Routing



export default server