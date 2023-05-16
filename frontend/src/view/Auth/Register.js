import axios from 'axios';
import React, { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
    

    const [campPNome, setcampPNome] = useState("");
    const [campUNome, setcampUNome] = useState("");
    const [campEmail, setcampEmail] = useState("");
    const [campTelemovel, setcampTelemovel] = useState("");
    const [campPassword, setcampPassword] = useState("");
    const [campPassword2, setcampPassword2] = useState("");



    function SendSave() {
        if (campPNome === "") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Primeiro Nome!',
            });
        }
        else if (campUNome ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Último Nome!',
            });   
        }else if (campEmail ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira o Email!',
            });   
        }else if (campPassword ==="") {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Insira a Password!',
            });     
        }else if (campPassword2 === false) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Oops...',
                text: 'Confirme a Password!',
            });     
        }

        else {
            const baseUrl = "http://localhost:3000/users/register";
                const datapost = {
                pname: campPNome,
                uname: campUNome,
                telemovel: campTelemovel,
                email: campEmail,
                password: campPassword, 
            };
            console.log(datapost);
            axios.post(baseUrl, datapost)
            .then((response) => {
                if (response.data.success === false) {
                    alert(response.data.message);
                } 
                else
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/login')
                }
            })
            .catch((error) => {
                alert("Error 34 " + error);
            }); 
        }
    }

    return (
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
                    <input type="text" className="form-control" placeholder="Email" value={campEmail} onChange={(value)=> setcampEmail(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Telemóvel</label>
                    <input type="number" className="form-control" placeholder="Telemóvel" value={campTelemovel} onChange={(value)=> setcampTelemovel(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" value={campPassword} onChange={(value)=> setcampPassword(value.target.value)}/>
                </div>
                <div className="form-group col-md-6">
                    <label>Confirmar Password</label>
                    <input type="password" className="form-control" placeholder="Confirmar Password" value={campPassword2} onChange={(value)=> setcampPassword2(value.target.value)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={()=>SendSave()}>Registar</button>
        </div>
    );
}