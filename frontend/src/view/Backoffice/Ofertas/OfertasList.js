import './OfertasList.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import React ,{useEffect, useState} from "react";

export default function OfertasListBO(){
    const [dataOfertas, setDataOfertas] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        LoadOfertasBO();
    },[]);

    function LoadOfertasBO() {
        const url = "https://pint-backend.onrender.com/ofertas/list";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setDataOfertas(data);
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
        const url = "https://pint-backend.onrender.com/ofertas/delete"
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
                LoadOfertasBO()
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

    function LoadFillData(){
        const sortedData = dataOfertas.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id}>
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.titulo}</td>
                    <td className='align-middle'>{data.departamento}</td>
                    <td className='align-middle'>{data.localizacao}</td>
                    <td className='align-middle'>{data.tiposofertavaga.tipo}</td>
                    <td className='align-middle'>{data.estadosofertavaga.estado}</td>
                    <td className='align-middle'>{data.data_criacao.slice(0,10)}</td>
                    <td className='align-middle'>{data.data_atualizacao.slice(0,10)} {data.data_atualizacao.slice(11,19)}</td>

                    <td className='align-middle'>
                        <Link className="btn btn-outline-info " to={"/backoffice/ofertas/update/"+data.id} >Edit</Link>
                    </td>
                    <td className='align-middle'>
                        <button className="btn btn-outline-danger" onClick={()=>OnDelete(data.id)}> Delete </button>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div>
            <Link className="btn_adicionar_oferta " to={"/backoffice/ofertas/create"}>Criar Nova</Link>
            {/* <button onClick={() => navigate('/backoffice/ofertas/create')} className='btn_adicionar_oferta'>Criar Nova</button> */}
            <table className="table table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">TITULO</th>
                        <th scope="col">DEPARTAMENTO</th>
                        <th scope="col">LOCALIZAÇÃO</th>
                        <th scope="col">TIPO DE OFERTA</th>
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
        </div>
    );
}
