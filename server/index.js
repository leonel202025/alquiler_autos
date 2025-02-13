// Importación de Express: El framework para construir aplicaciones web en Node.js.
// Importación de Cors: Middleware para permitir solicitudes entre dominios diferentes y evitar problemas de seguridad del navegador.
import Express from "express"
import cors from "cors"

// Importación de las rutas específicas para las entidades autos, clientes y reservas
import autosRoutes from "./src/routes/autos.routes.js"
import clientesRoutes from "./src/routes/clientes.routes.js"
import reservasRoutes from "./src/routes/reservas.routes.js"

// Creación de una instancia de la aplicación Express
const app = Express()

// Configuración de Cors para permitir solicitudes desde http://localhost:5173
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Habilitación del middleware para manejar datos en formato JSON
app.use(Express.json());

// Configuración de las rutas para las entidades autos, clientes y reservas bajo el prefijo "/api"
app.use("/api", autosRoutes)
app.use("/api", clientesRoutes)
app.use("/api", reservasRoutes)

// Configuración del servidor para escuchar en el puerto 3005
app.listen(3005)


/* se explica el uso de Cors para permitir solicitudes desde un dominio específico y se muestra cómo se configuran 
las rutas para las entidades autos, clientes y reservas bajo el prefijo "/api". Finalmente, se especifica que la 
aplicación escuchará en el puerto 3005. */