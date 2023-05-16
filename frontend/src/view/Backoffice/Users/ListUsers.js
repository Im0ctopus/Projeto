import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import React ,{useEffect, useState} from "react";
export default function ListUserBO(){

    const navigate = useNavigate()
    const [dataUsers, setDataUsers] = useState([]);
    const {oportunidadeId} = useParams();

    useEffect(() => {
        LoadUsersBO();
    },[]);

    function LoadUsersBO() {
        const url = "http://localhost:3000/users/list/";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setDataUsers(data);
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
        const url = "http://localhost:3000/oportunidades/delete"
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
                LoadUsersBO()
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
        const sortedData = dataUsers.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.primeiro_nome + ' ' + data.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.email}</p>
                    </td>
                    <td className='align-middle'>{data.telemovel}</td>
                    <td className='align-middle'>{data.cargo}</td>
                    <td className='align-middle'>{data.estado ? "Ativo" : "Inativo"}</td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={"/backoffice/oportunidades/" + oportunidadeId + "/contacto/" + data.id + "/update"} >Edit</Link>
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
        <Link className="btn_adicionar_contacto " to={"/backoffice/oportunidades/"+ oportunidadeId +"/contactos/create"}>Criar Novo</Link>
        <table className="table table-hover table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">NOME</th>
                    <th scope="col">TELEMÓVEL</th>
                    <th scope="col">CARGO</th>
                    <th scope="col">ESTADO</th>
                    <th scope="col">EDITAR</th>
                    <th scope="col">AÇÃO</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData/>
            </tbody>
        </table>
        </>
    );
}
