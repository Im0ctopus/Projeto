import axios from 'axios';
import React, { useEffect, useState } from "react";
import './FormOportunidade.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from 'react-router-dom';

export default function OportunidadeCreate() {
    const navigate = useNavigate()

    const [dataTiposProjeto, setdataTiposProjeto] = useState([]);
    const [dataAreasNegocio, setdataAreasNegocio] = useState([]);

    const [selectTipo, setSelectTipo] = useState("");
    const [selectArea, setSelectArea] = useState("");
    const [campTitulo, setcampTitulo] = useState("");
    const [campEmpresa, setcampEmpresa] = useState("");
    const [campNecessidades, setcampNecessidades] = useState("");

    function SendSave() {
      if (selectTipo === "") {
          Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: 'Insira o Tipo de Projeto!',
            });
      } else if (selectArea ==="") {
          Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: 'Insira a Area de Negocio!',
            });
      } else if (campTitulo ==="") {
          Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: 'Insira o Título!',
            });   
      }else if (campEmpresa ==="") {
          Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: 'Insira a Empresa!',
            });   
      }else if (campNecessidades ==="") {
          Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Oops...',
              text: 'Insira a Necessidade!',
            });   
      }
      else {
        const baseUrl = "http://localhost:3000/oportunidades/create";
        const datapost = {
          tipodeprojeto: selectTipo,
          areadenegocio: selectArea,
          titulo: campTitulo,
          empresa: campEmpresa,
          necessidade: campNecessidades
        };
        axios
          .post(baseUrl, datapost)
          .then((response) => {
            if (response.data.success === false) {
              alert(response.data.message);
            }
            else
            {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Oportunidade Submetida',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/oportunidades')
            }
          })
          .catch((error) => {
            alert("Error 34 " + error);
          });
      }
    }


      const LoadTiposProjeto = () =>{
          const url = "http://localhost:3000/tipos/projetos/list";
          axios.get(url)
          .then(res => {
              if(res.data.success){
                  const data = res.data.data;
                  setdataTiposProjeto(data);
              }else{
                  alert("Error Web Service!");
              }
          })
          .catch(error => {
              alert(error)
          });
      }

      const LoadAreasNegocio = () =>{
          const url = "http://localhost:3000/areas/list";
          axios.get(url)
          .then(res => {
              if(res.data.success){
                  const data = res.data.data;
                  setdataAreasNegocio(data);
              }else{
                  alert("Error Web Service!");
              }
          })
          .catch(error => {
              alert(error)
          });
      }

    useEffect(() =>{
        LoadTiposProjeto();
        LoadAreasNegocio();
    }, [])

    return (
        <div className='form-op'>
            <div className="form-group col-md-6 mt-3">
                <label htmlFor="inputtitulo">Título </label>
                <input id="inputtitulo" type="text" className="form-control" placeholder="Título" value={campTitulo} onChange={value=> setcampTitulo(value.target.value)}/>
            </div>
            <div className="form-group col-md-6 mt-3">
                <label htmlFor="inputempresa">Empresa </label>
                <input id="nputempresa" type="text" className="form-control" placeholder="Empresa" value={campEmpresa} onChange={value=> setcampEmpresa(value.target.value)}/>
            </div>
            <div className="form-group col-md-6 mt-3">
                <label htmlFor="inputnecessidades">Necessidades </label>
                <textarea id="inputnecessidades" type="text" className="form-control" placeholder="Necessidades" value={campNecessidades} onChange={value=> setcampNecessidades(value.target.value)}/>
            </div>
            <div className='row mt-3'>
                <div className="form-group col-md-3">
                    <label htmlFor="inputtipo">Tipo de Projeto</label>
                    <select id="inputtipo" className="form-control" onChange={value=> setSelectTipo(value.target.value)}>
                        <option disabled selected>Choose...</option> 
                        {dataTiposProjeto.map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.tipo}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="inputarea">Área de Negócio</label>
                    <select id="inputarea" className="form-control" onChange={value=> setSelectArea(value.target.value)}>
                        <option disabled selected >Choose...</option>
                        {dataAreasNegocio.map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.area}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendSave()}>Submeter</button>
        </div>
    )
}