import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Home from './view/home';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footer from './components/footer';

import OportunidadesList from './view/Oportunidades/oportunidades';
import OportunidadeCreate from './view/Oportunidades/FormOportunidade';

import Index from './view/index';

import OfertasList from './view/Ofertas/ofertas';

//Imports para a backoffice
import Dashboard from './view/Backoffice/Dashboard'

import OportunidadesListBO from './view/Backoffice/Oportunidades/OportunidadesList';
import OportunidadeEditBO from './view/Backoffice/Oportunidades/OportunidadeEdit';

import OfertasListBO from './view/Backoffice/Ofertas/OfertasList';
import OfertaEditBO from './view/Backoffice/Ofertas/OfertaEdit';
import OfertaCreate from './view/Backoffice/Ofertas/FormOfertas'

import IdeiasListBO from './view/Backoffice/Ideias/IdeiasList';

function App() {
  return (
  <Router>
    <div className="App">
      <Navbar/>
      <Sidebar/>
      {/* ROTAS */}
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/home" element={<Home/>} />
        
        <Route path="/oportunidades" element={<OportunidadesList/>} />
        <Route path='/oportunidades/create' element={<OportunidadeCreate/>} />

        <Route path="/ofertas" element={<OfertasList/>} /> 
        {/* backoffice */} 
        <Route path='/backoffice/dashboard' element={<Dashboard/>} />

        <Route path='/backoffice/oportunidades' element={<OportunidadesListBO/>} />
        <Route path='/backoffice/oportunidades/edit/:oportunidadeId' element={<OportunidadeEditBO/>} />

        <Route path='/backoffice/ofertas' element={<OfertasListBO/>} />
        <Route path='/backoffice/ofertas/edit/:ofertaId' element={<OfertaEditBO/>} />
        <Route path='/backoffice/ofertas/create' element={<OfertaCreate/>} />

        <Route path='/backoffice/ideias' element={<IdeiasListBO/>} />


      </Routes>
      <Footer/>
    </div>
  </Router>
  );
}
export default App;
