import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss'

export default function InteracoesContactoUpdate() {
    const navigate = useNavigate()

    const {oportunidadeId, contactoId, interacaoId} = useParams();

    const [dataTiposInteracao, setdataTiposInteracao] = useState([])

    const [campMotivo, setcampMotivo] = useState("");
    
    const [defaultTipo, setDefaultTipo] = useState("");
    const [selectTipo, setSelectTipo] = useState("");
    const [stringTipo, setstringTipo] = useState("");
    
    const LoadTiposInteracao = () =>{
        const url = "http://localhost:3000/tipos/interacao/list";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataTiposInteracao(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    const LoadInteracao = () =>{
        const url = "http://localhost:3000/interacoes/get/"+interacaoId+"/contacto/"+contactoId+"/oportunidade/"+oportunidadeId
        axios.get(url)
        .then(res=>{
        if (res.data.success) {
            const data = res.data.data[0];
            setcampMotivo(data.motivo)
            
            setDefaultTipo(data.tiposinteracao.tipo)
            setSelectTipo(data.tiposinteracaoId);
            setstringTipo(data.tiposinteracao.tipo)
        }
        else {
        alert("Error web service")
        }
        })
        .catch(error=>{
        alert("Error server: "+error)
        })
        LoadTiposInteracao()
    }
    
    useEffect(() => {
        LoadInteracao()
    }, []);

    function SendUpdate() {
        if (campMotivo ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Primeiro Nome!',
            });   
        }else if (selectTipo ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Tipo de Interação!',
            });
        }
        else {
            const baseUrl = "http://localhost:3000/interacoes/update/"+interacaoId+"/contacto/"+contactoId+"/oportunidade/"+oportunidadeId
            const datapost = {
                motivo: campMotivo,
                tipo: selectTipo
            };
            axios.post(baseUrl, datapost)
            .then(response => {
                if (response.data.success === false) {
                    alert(response.data.message)
                } 
                else
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Interacação Atualizada',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/backoffice/oportunidades/' + oportunidadeId + '/contactos/'+contactoId+'/interacoes')
                }
            })
            .catch((error) => {
                alert("Error 34 " + error);
            }); 
        }
    }

    return (
        <>
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/" + interacaoId+"/update"}>Detalhes</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/" + interacaoId+"/notas"}>Notas</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={""}>Ficheiros</Link>
            </li>
        </ul>
 
        <div style={{marginLeft:'15%'}}>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label>Motivo</label>
                    <input type="text" className="form-control" placeholder="Motivo" value={campMotivo} onChange={(value)=> setcampMotivo(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Tipos de Interação</label>
                    <select id="inputState" className="form-control" onChange={(value)=> setSelectTipo(value.target.value)}>
                        <option value={selectTipo}>{defaultTipo}</option>
                        {dataTiposInteracao.filter((data) => data.tipo !== defaultTipo && data.id !== 3)
                        .map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.tipo}</option>
                            )
                        })}
                    </select>
                </div>          
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendUpdate()}>Submeter</button>
        </div>
        </>
    );
}