import { Link, useLocation } from "react-router-dom";
import './sidebar.css'




import { AiFillHome, AiFillWarning } from "react-icons/ai";
import {TbTarget} from "react-icons/tb";
import {HiOutlineMagnifyingGlass} from "react-icons/hi2"
import {BsLightbulbFill} from "react-icons/bs"
import {RiHandCoinFill} from "react-icons/ri"
import {AiFillDashboard} from "react-icons/ai"



function Sidebar(){
  const Location = useLocation();
  function Backoffice(){
    return(
      <ul className="nav nav-pills flex-column ">
        <hr />
        <li>
          Backoffice
        </li>
        <hr />
          <li className="nav-item">
            <Link to="/backoffice/dashboard" className={`nav-link ${Location.pathname === "/backoffice/dashboard" ? "active" : "link-dark"} mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <AiFillDashboard size={15}/>
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/backoffice/oportunidades" className={`nav-link ${Location.pathname === "/backoffice/oportunidades" ? "active" : "link-dark"} mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <TbTarget size={15} />
              </svg>
              Oportunidades
            </Link>
          </li>
          <li>
            <Link to="/backoffice/ofertas" className={`nav-link ${Location.pathname === "/backoffice/ofertas" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <HiOutlineMagnifyingGlass size={15} />
              </svg>
              Ofertas/Vagas
            </Link>
          </li>
          <li>
            <Link to="/backoffice/ideias" className={`nav-link ${Location.pathname === "/backoffice/ideias" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <BsLightbulbFill size={15} />
              </svg>
              Ideias
            </Link>
          </li>
          <li>
            <Link to="/beneficios" className={`nav-link ${Location.pathname === "/beneficios" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <RiHandCoinFill size={15} />
              </svg>
              Benefícios
            </Link>
          </li>
          <li>
            <Link to="/avisos" className={`nav-link ${Location.pathname === "/avisos" ? "active" : "link-dark"} mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <AiFillWarning size={15} />
              </svg>
              Avisos
            </Link>
          </li>
        </ul>
    );
  }


    return(
        <div  className="d-flex flex-column flex-shrink-0 p-4 bg-light sidebar">
        <ul className="nav nav-pills flex-column ">
          <li>
            <Link to="/home" className={`nav-link ${Location.pathname === "/home" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <AiFillHome size={15}/>
              </svg>
              <span className="name">Página Principal</span>
            </Link>
          </li>
          <li>
            <Link to="/oportunidades" className={`nav-link ${Location.pathname === "/oportunidades" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <TbTarget size={15} />
              </svg>
              <span className="name">Oportunidades</span>
            </Link>
          </li>
          <li>
            <Link to="/ofertas" className={`nav-link ${Location.pathname === "/ofertas" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <HiOutlineMagnifyingGlass size={15} />
              </svg>
              <span className="name">Ofertas/Vagas</span>
            </Link>
          </li>
          <li>
            <Link to="/ideias" className={`nav-link ${Location.pathname === "/ideias" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <BsLightbulbFill size={15} />
              </svg>
              <span className="name">Ideias</span>
            </Link>
          </li>
          <li>
            <Link to="/beneficios" className={`nav-link ${Location.pathname === "/beneficios" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <RiHandCoinFill size={15} />
              </svg>
              <span className="name">Benefícios</span>
            </Link>
          </li>
          <li>
            <Link to="/avisos" className={`nav-link ${Location.pathname === "/avisos" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <AiFillWarning size={15} />
              </svg>
              <span className="name">Avisos</span>
            </Link>
          </li>
        </ul>
        {/* <Backoffice /> */}
      </div>
    );
}
export default Sidebar;