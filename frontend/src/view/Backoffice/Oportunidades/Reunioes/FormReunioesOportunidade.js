import './FormReunioesOportunidade.css'
import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate, useParams } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss'

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function ReuniaoOportunidadeCreate() {
    const navigate = useNavigate()
    
    const {oportunidadeId} = useParams();
    const [campTitulo, setcampTitulo] = useState("");
    const [campDetalhes, setcampDetalhes] = useState("");
    const [campDataReuniao, setcampDataReuniao] = useState(new Date());
        
    function SendSave() {
        if (campTitulo ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Título!',
            });   
        }else if (campDetalhes ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira os Detalhes!',
            });
            }else if (campDataReuniao === "") {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Insira a Data!',
                });     
            }
        else {
            const baseUrl = "http://localhost:3000/reunioes/oportunidade/"+ oportunidadeId + "/create";
            const datapost = {
                titulo: campTitulo,
                detalhes: campDetalhes,
                data_reuniao: new Date(campDataReuniao).setHours(new Date(campDataReuniao).getHours()+2)
            };
            axios.post(baseUrl, datapost)
            .then(response => {
                console.log(response)
                if (response.data.success === false) {
                    alert(response.data.message)
                } 
                else
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Reunião Submetida',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/backoffice/oportunidades/' + oportunidadeId + '/reunioes')
                }
            })
            .catch((error) => {
                alert("Error 34 " + error);
            }); 
        }
    }  

    const handleDateChange = (date) =>{
        const currentDate = new Date();

        // Verifica se a data selecionada é menor que a data atual
        if (date < currentDate) {
          // Ignora a seleção da data inferior à atual
          return;
        }

        const dataReuniao = new Date(date);
        setcampDataReuniao(dataReuniao)
    }

    return (
        <div style={{marginLeft:'15%'}}>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label>Título</label>
                    <input type="text" className="form-control" placeholder="Título" value={campTitulo} onChange={(value)=> setcampTitulo(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Detalhes</label>
                    <input type="text" className="form-control" placeholder="Detalhes" value={campDetalhes} onChange={(value)=> setcampDetalhes(value.target.value)}/>
                </div> 
                <div className="form-group col-md-6">
                    <label>Data</label>
                    <DatePicker shouldCloseOnSelect={false} onKeyDown={(e) => e.preventDefault()}className='teste' selected={campDataReuniao} onChange={(date) => handleDateChange(date)} showTimeSelect dateFormat="dd/MM/yyyy HH:mm" />                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendSave()}>Submeter</button>
        </div>
    );
}