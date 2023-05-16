import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import React ,{useEffect, useState} from "react";
export default function ContactosOportunidadeListBO(){

    const navigate = useNavigate()
    const [dataContactos, setDataContactos] = useState([]);
    const {oportunidadeId} = useParams();

    useEffect(() => {
        LoadContactosOportunidadeBO();
    },[]);

    function LoadContactosOportunidadeBO() {
        const url = "https://pint-backend.onrender.com/contactos/list/oportunidade/"+oportunidadeId;
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setDataContactos(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }
    function SendDelete(id)
    {
        // url do backend 
        const url = "https://pint-backend.onrender.com/oportunidades/delete"
        // network
        axios.post(url,{
            id:id
        })
        .then(response =>{
            if (response.data.success) {
                Swal.fire(
                'Deleted!',
                'Your filme has been deleted.',
                'success'
                )
                LoadContactosOportunidadeBO()
            }
        })
        .catch ( error => {
            alert("Error 325 ")
        })
    }

    function OnDelete(id){
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it!'
        }).then((result) => {
        if (result.value) {
            SendDelete(id)
        } else if (result.dismiss ===
            Swal.DismissReason.cancel) {
                Swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
                )
            }
        })
    }

    const handleDeleteClick = (e, id) =>{
        e.stopPropagation()
        OnDelete(id)
    }

    function LoadFillData(){
        const sortedData = dataContactos.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.primeiro_nome + ' ' + data.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.email}</p>
                    </td>
                    <td className='align-middle'>{data.telemovel}</td>
                    <td className='align-middle'>{data.cargo_na_empresa}</td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={"/backoffice/oportunidades/" + oportunidadeId + "/contactos/" + data.id + "/update"} >Edit</Link>
                    </td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-danger"  onClick={(e)=>handleDeleteClick(e, data.id)}>Delete</Link>
                    </td>
                </tr>
            )
        });
    }
    return (
        <>
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/update/" + oportunidadeId}>Detalhes</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId + "/contactos"}>Contactos</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId + "/reunioes"}>Reuniões</Link>
            </li>
        </ul>
        <Link className="btn_adicionar_contacto " to={"/backoffice/oportunidades/"+ oportunidadeId +"/contactos/create"}>Criar Novo</Link>
        <table className="table table-hover table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">NOME</th>
                    <th scope="col">TELEMÓVEL</th>
                    <th scope="col">CARGO</th>
                    <th scope="col">EDITAR</th>
                    <th colSpan="2">AÇÃO</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData/>
            </tbody>
        </table>
        </>
    );
}
