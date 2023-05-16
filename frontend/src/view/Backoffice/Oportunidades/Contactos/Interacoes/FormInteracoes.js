import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate, useParams } from 'react-router-dom';

export default function InteracaoCreate() {
    const navigate = useNavigate()
    
    const {oportunidadeId, contactoId} = useParams();

    const [dataTiposInteracao, setdataTiposInteracao] = useState([])

    const [campMotivo, setcampMotivo] = useState("");
    
    const [selectTipo, setSelectTipo] = useState("");
        
    const LoadTiposInteracao = () =>{
        const url = "https://pint-backend.onrender.com/tipos/interacao/list";
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

    function SendSave() {
        if (campMotivo ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Motivo!',
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
            const baseUrl = "https://pint-backend.onrender.com/interacoes/create/contacto/"+contactoId+"/oportunidade/"+oportunidadeId;
            const datapost = {
                tipo: selectTipo,
                motivo: campMotivo,
            };
            axios.post(baseUrl, datapost)
            .then((response) => {
                console.log(response);
                if (response.data.success === false) {
                    alert(response.data.message);
                } 
                else
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Interacao Submetido',
                        showConfirmButton: false,
                        timer: 1500
                      });
                    navigate("/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes/")
                }
            })
            .catch((error) => {
                alert("Error 34 " + error);
            }); 
        }
    }

    useEffect(() =>{
        LoadTiposInteracao();
    }, [])
    return (
        <div style={{marginLeft:'15%'}}>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label>Motivo</label>
                    <input type="text" className="form-control" placeholder="Motivo" value={campMotivo} onChange={(value)=> setcampMotivo(value.target.value)}/>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="inputtipo">Tipo de Interação</label>
                    <select id="inputtipo" className="form-control" onChange={value=> setSelectTipo(value.target.value)}>
                        <option selected>Choose...</option> 
                        {dataTiposInteracao.filter((data) => data.id !== 3)
                        .map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.tipo}</option>
                            )
                        })}
                    </select>
                </div>   
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendSave()}>Submeter</button>
        </div>
    );
}