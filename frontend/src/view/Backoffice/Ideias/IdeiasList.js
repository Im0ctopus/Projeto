import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import axios from 'axios';
import { Link } from "react-router-dom";
import React ,{useEffect, useState} from "react";
export default function IdeiasListBO(){

    const [dataIdeias, setDataIdeias] = useState([]);


    useEffect(() => {
        LoadOportunidadesBO();
    },[]);

    function LoadOportunidadesBO() {
        const url = "http://localhost:3000/ideias/list";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setDataIdeias(data);
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
        const url = "http://localhost:3000/ideias/delete"
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
    function LoadFillData(){
        const sortedData = dataIdeias.sort((a, b) => (b.id) - (a.id));
        return sortedData.map((data)=>{
            return(
                <tr key={data.id}>
                    <th className='align-middle'>{data.id}</th> 
                    <td className='align-middle'>{data.user.primeiro_nome + ' ' + data.user.ultimo_nome}
                        <p style={{fontSize:"13px"}}>{data.user.email}</p>
                    </td>
                    <td className='align-middle'>{data.titulo}</td>
                    <td className='align-middle'>{data.tipodeideia.tipo}</td>

                    <td className='align-middle'>
                        <Link className="btn btn-outline-info " to={"/backoffice/oportunidades/update/"+data.id} >Edit</Link>
                    </td>
                    <td className='align-middle'>
                        <button className="btn btn-outline-danger" onClick={()=>OnDelete(data.id)}> Delete </button>
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
                    <th scope="col">TÍTULO</th>
                    <th scope="col">TIPO DE IDEIA</th>
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
