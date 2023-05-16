import {BiUserCircle} from "react-icons/bi"
import './navbar.css'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/"> <img className='logo' src="https://www.empregoregiadouro.com/uploads/0000/65/2022/06/29/logotipo-softinsa.png" alt="SOFTINSA" /> </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <svg className="bi me-2" width="35" height="35">
              <BiUserCircle size={35}/>
            </svg>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="usernameDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginRight:'90px'}} >
                    Username
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="usernameDropdown">
                    <li><a className="dropdown-item" href="#">Perfil</a></li>
                    <li><a className="dropdown-item" href="#">Definições</a></li>
                    <li><Link className="dropdown-item" to="/backoffice/dashboard">BackOffice</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Logout</a></li>
                  </ul>
                </li>
              </ul>
        </div>
      </nav>
      
    );
}
export default Navbar;