import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import AuthService from "./view/auth.service";

import Home from './view/home';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import Goup from './components/Goup'

import OportunidadesList from './view/Oportunidades/oportunidades';
import OportunidadeCreate from './view/Oportunidades/FormOportunidade';

import Index from './view/index';

import OfertasList from './view/Ofertas/ofertas';


import Register from './view/Auth/Register';
import Login from './view/Auth/Login';

//Imports para a backoffice
import Dashboard from './view/Backoffice/Dashboard'

//----------------------------------------------------------------------------------------------------------------

import OportunidadesListBO from './view/Backoffice/Oportunidades/OportunidadesList';
import OportunidadeEditBO from './view/Backoffice/Oportunidades/OportunidadeEdit';

import ContactosOportunidadeListBO from './view/Backoffice/Oportunidades/Contactos/ContactosOportunidadeList';
import ContactoCreate from './view/Backoffice/Oportunidades/Contactos/FormContactos';
import ContactosOportunidadeUpdate from './view/Backoffice/Oportunidades/Contactos/ContactosOportunidadeEdit';

import InteracoesContactoListBO from './view/Backoffice/Oportunidades/Contactos/Interacoes/InteracoesContactoList';
import InteracaoCreate from './view/Backoffice/Oportunidades/Contactos/Interacoes/FormInteracoes';
import InteracoesContactoUpdate from './view/Backoffice/Oportunidades/Contactos/Interacoes/InteracoesContactoEdit';

import NotasInteracaoListBO from './view/Backoffice/Oportunidades/Contactos/Interacoes/Notas/NotasInteracoesList';

import ReunioesOportunidadeListBO from './view/Backoffice/Oportunidades/Reunioes/ReunioesOportunidadeList';
import ReuniaoOportunidadeCreate from './view/Backoffice/Oportunidades/Reunioes/FormReunioesOportunidade';
import ReuniaoOportunidadeEdit from './view/Backoffice/Oportunidades/Reunioes/ReunioesOportunidadeEdit';

//----------------------------------------------------------------------------------------------------------------

import OfertasListBO from './view/Backoffice/Ofertas/OfertasList';
import OfertaEditBO from './view/Backoffice/Ofertas/OfertaEdit';
import OfertaCreate from './view/Backoffice/Ofertas/FormOfertas'

//----------------------------------------------------------------------------------------------------------------

import ListUserBO from './view/Backoffice/Users/ListUsers';

//----------------------------------------------------------------------------------------------------------------

import IdeiasListBO from './view/Backoffice/Ideias/IdeiasList';
import IdeiasList from './view/Ideias/Ideias';
import IdeiaCreate from './view/Ideias/FormIdeia';

import Notfound from './404';

function App() {
  
  const [currentUser, setcurrentUser] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setcurrentUser({ currentUser: user });
    }
  }, []);

  return (
  <Router>
    <div className="App">
      <Navbar/>
      <Sidebar/>
      {/* ROTAS */}
      <div className='rotas'>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        
        <Route path="/oportunidades" element={<OportunidadesList/>} />
        <Route path='/oportunidades/create' element={<OportunidadeCreate/>} />

        <Route path="/ofertas" element={<OfertasList/>} /> 

        <Route path='/ideias' element={<IdeiasList/>} />
        <Route path='/ideias/create' element={<IdeiaCreate/>} />

        {/* backoffice */} 
        <Route path='/backoffice/dashboard' element={<Dashboard/>} />

        <Route path='/backoffice/oportunidades' element={<OportunidadesListBO/>} />
        <Route path='/backoffice/oportunidades/update/:oportunidadeId' element={<OportunidadeEditBO/>} />

        <Route path='/backoffice/oportunidades/:oportunidadeId/contactos' element={<ContactosOportunidadeListBO/>} />
        <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/create' element={<ContactoCreate/>} />
        <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/update' element={<ContactosOportunidadeUpdate/>} />

        <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes' element={<InteracoesContactoListBO/>} />
        <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/create' element={<InteracaoCreate/>} />
        <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/:interacaoId/update' element={<InteracoesContactoUpdate/>} />

        <Route path='/backoffice/oportunidades/:oportunidadeId/contactos/:contactoId/interacoes/:interacaoId/notas' element={<NotasInteracaoListBO/>} />

        
        <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes' element={<ReunioesOportunidadeListBO/>} />
        <Route path='/backoffice/oportunidades/:oportunidadeId/reuniao/:reuniaoId/update' element={<ReuniaoOportunidadeEdit/>} />
        <Route path='/backoffice/oportunidades/:oportunidadeId/reunioes/create' element={<ReuniaoOportunidadeCreate/>} />

        <Route path='/backoffice/ofertas' element={<OfertasListBO/>} />
        <Route path='/backoffice/ofertas/update/:ofertaId' element={<OfertaEditBO/>} /> 
        <Route path='/backoffice/ofertas/create' element={<OfertaCreate/>} />

        <Route path='/backoffice/users' element={<ListUserBO/>} />

        <Route path='/backoffice/ideias' element={<IdeiasListBO/>} />



        <Route path='*' element={<Notfound />}/>
      </Routes>
      </div>
      {/* ROTAS */}
      <Goup/>
      <Footer/>
    </div>
  </Router>
  );
}
export default App;
