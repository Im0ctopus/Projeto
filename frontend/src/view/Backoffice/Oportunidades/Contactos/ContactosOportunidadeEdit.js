import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss'

export default function ContactosOportunidadeUpdate() {
    const navigate = useNavigate()

    const {oportunidadeId, contactoId} = useParams();
    const [campPNome, setcampPNome] = useState("");
    const [campUNome, setcampUNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campCargo, setcampCargo] = useState("");
    const [campTelemovel, setcampTelemovel] = useState("");

    const LoadContacto = () =>{
        const url = "http://localhost:3000/contactos/get/"+ contactoId +"/oportunidade/"+oportunidadeId
        axios.get(url)
        .then(res=>{
        if (res.data.success) {
            const data = res.data.data[0];
            setcampPNome(data.primeiro_nome)
            setcampUNome(data.ultimo_nome)             
            setcampEmail(data.email);
            setcampCargo(data.cargo_na_empresa)
            setcampTelemovel(data.telemovel)
        }
        else {
        alert("Error web service")
        }
        })
        .catch(error=>{
        alert("Error server: "+error)
        })

    }

    useEffect(() => {
        LoadContacto()
    }, []);

    function SendUpdate() {
        if (campPNome ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Primeiro Nome!',
            });   
        }else if (campUNome ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Último Nome!',
            });
        }else if (campEmail === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Email!',
            });     
        }else if (campCargo === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Cargo!',
            });     
        }else if (campTelemovel === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Telemóvel!',
            });     
        }
        else {
            const baseUrl = "http://localhost:3000/contactos/update/"+ contactoId + "/oportunidade/" + oportunidadeId;
            const datapost = {
                primeiro_nome: campPNome,
                ultimo_nome: campUNome,
                telemovel: campTelemovel,
                email: campEmail,
                cargo: campCargo,
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
                        title: 'Contacto Atualizado',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/backoffice/oportunidades/' + oportunidadeId + '/contactos')
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
                <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/update"}>Detalhes</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+oportunidadeId+"/contactos/"+contactoId+"/interacoes"}>Interações</Link>
            </li>
        </ul>

        <div style={{marginLeft:'15%'}}>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label>Primeiro Nome</label>
                    <input type="text" className="form-control" placeholder="Primeiro Nome" value={campPNome} onChange={(value)=> setcampPNome(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Último Nome</label>
                    <input type="text" className="form-control" placeholder="Último Nome" value={campUNome} onChange={(value)=> setcampUNome(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Email</label>
                    <textarea type="text" className="form-control" placeholder="Email" value={campEmail} onChange={(value)=> setcampEmail(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Telemóvel</label>
                    <textarea type="text" className="form-control" placeholder="Telemóvel" value={campTelemovel} onChange={(value)=> setcampTelemovel(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Cargo</label>
                    <input type="text" className="form-control" placeholder="Cargo" value={campCargo} onChange={(value)=> setcampCargo(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendUpdate()}>Submeter</button>
        </div>
        </>
    );
}