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
          <Link className="navbar-brand" to="/"> <img className='logo' src="https://www.empregoregiadouro.com/uploads/0000/65/2022/06/29/logotipo-softinsa.png" alt="SOFTINSA" /> </Link>
          <Link className="navbar-brand navbar-small" to="/"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABoklEQVR4AWKw7XrFYNfzWh3Qfjko2RVEUTR/k18IRuXY/oEYpTjFaGzbtgpj27b9bN0zvcc9NTZuV6129VmP9zQj3NpxVsKwMIRDAmdLEAsxEfsCm7jIKGLQEVOE2BAIY9AxEQaBuWMUmIOA5RgFLBAQ1k5aOczS1T3DHc7PbYzACdgw/uQoKblBS4n1u6BusU1g7atoGVktBf2ZpqDgMg1d95gjqx0JOM1SfqeeFouwawq79HTLS0JX7GfpS4qCZBoLTcjN9MBPAqn9CQjCevj16kED3feV0GUW/E2MnMZlZszTGGsf+O5CwKdITZX9Birr48ErIVoJjDGb11M5W8tt09GLICmC05MAKXVPmbBn9wLAlknYOfNALKVRywmkNGhX9qJFALz1n+LlpDdh3x4FNgLf5OQGXgDj9YdC4CMEjBZRQBQQBQ5eQBQQBUQBPA1RcCjKZgJ4GhpMwsq+cQj47VPAivErXUFJS2kX2p9sbLWBKPKC2BrsW0zTgsrUO0/JNmbjZBXjjWW5fTtJSo8/LT/2i8nxXs2O/3Jqf7zX83lRC6vZf66shQAAAABJRU5ErkJggg==" alt="SOFTINSA" /> </Link>
        <ul className="nav nav-pills flex-column ">
          <li className="nav-item">
            <Link to="/home" className={`nav-link ${Location.pathname === "/home" ? "active" : ""} ${Location.pathname !== "/home" ? "link-dark" : ""} mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <AiFillHome size={15}/>
              </svg>
              Página Principal
            </Link>
          </li>
          <li>
            <Link to="/oportunidades" className={`nav-link ${Location.pathname === "/oportunidades" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <TbTarget size={15} />
              </svg>
              Oportunidades
            </Link>
          </li>
          <li>
            <Link to="/ofertas" className={`nav-link ${Location.pathname === "/ofertas" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <HiOutlineMagnifyingGlass size={15} />
              </svg>
              Ofertas/Vagas
            </Link>
          </li>
          <li>
            <Link to="/ideias" className={`nav-link ${Location.pathname === "/ideias" ? "active" : "link-dark"}  mb-3`}>
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
            <Link to="/avisos" className={`nav-link ${Location.pathname === "/avisos" ? "active" : "link-dark"}  mb-3`}>
              <svg className="bi me-2" width="16" height="16">
                <AiFillWarning size={15} />
              </svg>
              Avisos
            </Link>
          </li>
        </ul>
        <Backoffice />
      </div>
    );
}
export default Sidebar;