// Importamos la biblioteca Mongoose para interactuar con MongoDB.
import mongoose from "mongoose";

// Definimos una función llamada connectDB que se encarga de conectar con la base de datos.
// La palabra clave 'async' indica que esta función es asíncrona y puede contener operaciones que tomarán tiempo.
export const connectDB = async () => {
  try {
    // Utilizamos el método 'connect' de Mongoose para conectar con la base de datos MongoDB local llamada "litswapdb".
    // La palabra clave 'await' pausa la ejecución de la función hasta que la operación 'connect' se complete.
    await mongoose.connect("mongodb://localhost/litswapdb");
    console.log('$$$DB$$$ is conected')
  } catch (error) {
    // Si hay algún error durante la conexión, imprimimos un mensaje de error en la consola.
    console.log("error");
  }
};
