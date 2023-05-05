import {BiUserCircle} from "react-icons/bi"
import './navbar.css'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Logout</a></li>
                  </ul>
                </li>
              </ul>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;