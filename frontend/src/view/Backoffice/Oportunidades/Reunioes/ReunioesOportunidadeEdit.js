import './FormReunioesOportunidade.css'
import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate, useParams } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss'

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function ReuniaoOportunidadeEdit() {
    const navigate = useNavigate()

    const [dataEstadosReuniao, setdataEstadosReuniao] = useState([]);

    const {oportunidadeId, reuniaoId} = useParams();
    const [campTitulo, setcampTitulo] = useState("");
    const [campDetalhes, setcampDetalhes] = useState("");
    const [campDataReuniao, setcampDataReuniao] = useState(new Date());
        
    const [defaultEstado, setDefaultEstado] = useState("");
    const [selectEstado, setSelectEstado] = useState("");
    const [stringEstado, setstringEstado] = useState("");

    const LoadEstadosReuniao = () =>{
        const url = "https://pint-backend.onrender.com/estado/reuniao/list";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataEstadosReuniao(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    const LoadReuniao = () =>{
        const url = "https://pint-backend.onrender.com/reunioes/oportunidades/"+oportunidadeId+"/reuniao/" + reuniaoId
        axios.get(url)
        .then(res=>{
        if (res.data.success) {
            const data = res.data.data[0];
            setcampTitulo(data.titulo)
            setcampDetalhes(data.detalhes)

            const dataReuniao = new Date(data.data_reuniao);
            setcampDataReuniao(dataReuniao.setHours(dataReuniao.getHours() - 1));    

             
            setSelectEstado(data.estadosreuniaoId);
            setDefaultEstado(data.estadosreuniao.estado)
            setstringEstado(data.estadosreuniao.estado)
        }
        else {
        alert("Error web service")
        }
        })
        .catch(error=>{
        alert("Error server: "+error)
        })

        LoadEstadosReuniao();
    }

    useEffect(() => {
        LoadReuniao()
    }, []);

    function SendUpdate() {
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
        }else if (selectEstado === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Estado!',
            });     
        }
        else {
            const baseUrl = "https://pint-backend.onrender.com/reunioes/oportunidades/"+ oportunidadeId + "/reuniao/" + reuniaoId + "/update";
            const datapost = {
                titulo: campTitulo,
                detalhes: campDetalhes,
                data_reuniao: new Date(campDataReuniao).setHours(new Date(campDataReuniao).getHours()+2),
                estado: selectEstado,
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
                        title: 'Reuniao Atualizada',
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

        setcampDataReuniao(date);    
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
                    <label htmlFor="inputState">Estado da Reunião</label>
                    <select id="inputState" className="form-control" onChange={(value)=> setSelectEstado(value.target.value)}>
                        <option value={selectEstado}>{defaultEstado}</option>
                        {dataEstadosReuniao.filter((data) => data.estado !== defaultEstado)
                        .map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.estado}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label>Data</label>
                    <DatePicker shouldCloseOnSelect={false} onKeyDown={(e) => e.preventDefault()}className='teste' selected={campDataReuniao} onChange={(date) => handleDateChange(date)} showTimeSelect dateFormat="dd/MM/yyyy HH:mm" />                
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendUpdate()}>Submeter</button>
        </div>
    );
}