import './OportunidadesList.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import React ,{useEffect, useState} from "react";
export default function OportunidadesListBO(){

    const navigate = useNavigate()
    const [dataOportunidades, setDataOportunidades] = useState([]);


    useEffect(() => {
        LoadOportunidadesBO();
    },[]);

    function LoadOportunidadesBO() {
        const url = "https://pint-backend.onrender.com/oportunidades/list";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setDataOportunidades(data);
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
        {console.log(id)}
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
                LoadOportunidadesBO()
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

    const handleClick = (id) =>{
        navigate('/backoffice/oportunidades/updatea/'+ id)
    }

    const handleDeleteClick = (e, id) =>{
        e.stopPropagation()
        OnDelete(id)
    }

    function LoadFillData(){
        const sortedData = dataOportunidades.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id} > {/*onClick={()=> navigate('/backoffice/oportunidades/'+ data.id)}*/}
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'>{data.tiposdeprojeto.tipo}</td>
                    <td className='align-middle'>{data.areasdenegocio.area}</td>
                    <td className='align-middle'>{data.estadosoportunidade.estado}</td>
                    <td className='align-middle'>{data.data_criacao.slice(0,10)}</td>
                    <td className='align-middle'>{data.data_atualizacao.slice(0,10)} {data.data_atualizacao.slice(11,19)}</td>

                    <td className='align-middle'>
                        <Link className="btn btn-outline-info" onClick={(e) => e.stopPropagation()}  to={"/backoffice/oportunidades/update/"+data.id} >Edit</Link>
                    </td>
                    <td className='align-middle'>
                        <Link className="btn btn-outline-danger"  onClick={(e)=>handleDeleteClick(e, data.id)}>Delete</Link>
                        {/* <button className="btn btn-outline-danger" onClick={()=>OnDelete(data.id)}> Delete </button> */}
                    </td>
                </tr>
            )
        });
    }

   

    return (
        <table className="ml-5 table table-hover table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">CRIADOR</th>
                    <th scope="col">TIPO DE PROJETO</th>
                    <th scope="col">ÁREA DE NEGÓCIO</th>
                    <th scope="col">ESTADO</th>
                    <th scope="col">DATA CRIAÇÃO</th>
                    <th scope="col">DATA ATUALIZAÇÃO</th>
                    <th scope="col">EDITAR</th>
                    <th colSpan="2">AÇÃO</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData/>
            </tbody>
        </table>
    );
}
