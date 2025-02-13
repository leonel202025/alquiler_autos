import "../styles/navStyle.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="logo">
        <img src={logo} className="loguito" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/flota">Flota</Link>
          </li>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/reservas">Reservas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
