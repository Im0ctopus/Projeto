import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import React ,{useEffect, useState} from "react";
export default function ReunioesOportunidadeListBO(){

    const navigate = useNavigate()
    const [dataReunioes, setDataContactos] = useState([]);
    const {oportunidadeId} = useParams();
 
    useEffect(() => {
        LoadReunioesOportunidadeBO(); 
    },[]);

    function LoadReunioesOportunidadeBO() {
        const url = "http://localhost:3000/reunioes/oportunidade/"+oportunidadeId+"/list";
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
                LoadReunioesOportunidadeBO()
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
        const sortedData = dataReunioes.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'>{data.titulo}</td>
                    <td className='align-middle'>{data.estadosreuniao.estado}</td>
                    <td className='align-middle'>{data.data_reuniao.slice(0,10)} {data.data_reuniao.slice(11,19)}</td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={"/backoffice/oportunidades/"+oportunidadeId+"/reuniao/"+data.id+"/update"} >Edit</Link>
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
                <Link className="nav-link" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId + "/contactos"}>Contactos</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/backoffice/oportunidades/"+ oportunidadeId + "/reunioes"}>Reuniões</Link>
            </li>
        </ul>
        <Link className="btn_adicionar_contacto " to={"/backoffice/oportunidades/"+ oportunidadeId  +"/reunioes/create"}>Criar Nova</Link>
        <table className="table table-hover table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">CRIADOR</th>
                    <th scope="col">TÍTULO</th>
                    <th scope="col">ESTADO</th>
                    <th scope="col">DATA</th>
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
