import { connectDataBase } from "../server";
import db from "../config/db";



//Simula la conexion a la bd
jest.mock('../config/db')

describe('connectDataBase', () => {
    test('It should handle database connection error', async () => {
        //Espera a que se ejecute el metodo authenticate del objeto db y devuelve un error
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Error al conectar'))

        //Espera a que se ejecute el metodo log de console y comprueba que se llame con el mensaje de error
        const consoleSpy = jest.spyOn(console, 'log')

        //Mandas a llamar la conexion
        await connectDataBase()

        //Le decimos que consoleSpy debe ser llamado con el mensaje de error 
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error al conectar')
        )
    })
})