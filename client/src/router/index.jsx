// Importación de las bibliotecas y componentes necesarios de react-router-dom
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importación de las páginas necesarias
import clientes from '../pages/clientes';
import flota from '../pages/flota';
import Home from '../pages/Home';

// Definición de las rutas de la aplicación utilizando react-router-dom
function Routes() {
  return (
    <Router>
        {/* Configuración de las rutas y sus componentes asociados */}
        <Route path="/" exact component={Home} />
        <Route path="/flota" component={flota} />
        <Route path="/clientes" component={clientes} />
    </Router>
  );
}

// Exportación del componente de rutas
export default Routes;
