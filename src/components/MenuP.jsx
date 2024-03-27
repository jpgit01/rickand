import { NavLink, Link } from "react-router-dom";

function MenuP() {
  return (
    <>
        <Link className="menu-link" to="/contacto">Ir a Contacto</Link>
        <Link className="menu-link" to="/">Home</Link>
    </>
  );
}

export default MenuP;
