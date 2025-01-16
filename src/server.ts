import express from 'express'
import router from './routes'
import db from './config/db'
import colors from 'colors'

//Conection
const connectDataBase = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.magenta.bold('Conexion exitosa'))
    } catch (error) {
        console.log(colors.red.bold('Error al conectar'))
    }
}

connectDataBase()

const server = express()

server.use('/products', router)


export default server