import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const baseUrl = "http://localhost:3000/";
export default function OportunidadeEditBO(){

const [dataTiposProjeto, setdataTiposProjeto] = useState([]);
const [dataAreasNegocio, setdataAreasNegocio] = useState([]);
const [dataEstadosOportunidade, setdataEstadosOportunidade] = useState([]);

const {oportunidadeId} = useParams();
const [campTitulo, setcampTitulo] = useState("");
const [campEmpresa, setcampEmpresa] = useState("");
const [campNecessidades, setcampNecessidades] = useState("");

const [defaultTipo, setDefaultTipo] = useState("");
const [selectTipo, setSelectTipo] = useState("");
const [stringTipo, setstringTipo] = useState("");

const [defaultArea, setDefaultArea] = useState("");
const [selectArea, setSelectArea] = useState("");
const [stringArea, setstringArea] = useState("");

const [defaultEstado, setDefaultEstado] = useState("");
const [selectEstado, setSelectEstado] = useState("");
const [stringEstado, setstringEstado] = useState("");



const LoadTiposProjeto = () =>{
    const url = "http://localhost:3000/tipos/projetos/list";
    axios.get(url)
    .then(res => {
        if(res.data.success){
            const data = res.data.data;
            setdataTiposProjeto(data);
        }else{
            alert("Error Web Service!");
        }
    })
    .catch(error => {
        alert(error)
    });
}

const LoadAreasNegocio = () =>{
    const url = "http://localhost:3000/areas/list";
    axios.get(url)
    .then(res => {
        if(res.data.success){
            const data = res.data.data;
            setdataAreasNegocio(data);
        }else{
            alert("Error Web Service!");
        }
    })
    .catch(error => {
        alert(error)
    });
}

const LoadEstadosOportunidades = () =>{
    const url = "http://localhost:3000/estado/oportunidades/list";
    axios.get(url)
    .then(res => {
        if(res.data.success){
            const data = res.data.data;
            setdataEstadosOportunidade(data);
        }else{
            alert("Error Web Service!");
        }
    })
    .catch(error => {
        alert(error)
    });
}


const LoadOportunidades = () =>{
    const url = baseUrl+"oportunidades/get/" + oportunidadeId;
    axios.get(url)
    .then(res=>{
    if (res.data.success) {
        const data = res.data.data[0];
        setcampTitulo(data.titulo)
        setcampEmpresa(data.empresa)
        setcampNecessidades(data.necessidades)

        setSelectTipo(data.tiposdeprojetoId);
        setDefaultTipo(data.tiposdeprojeto.tipo)
        setstringTipo(data.tiposdeprojeto.tipo)

        setSelectArea(data.areasdenegocioId);
        setDefaultArea(data.areasdenegocio.area)
        setstringArea(data.areasdenegocio.area)

        setSelectEstado(data.estadosoportunidadeId);
        setDefaultEstado(data.estadosoportunidade.estado)
        setstringEstado(data.estadosoportunidade.estado) 

        // console.log(JSON.stringify(data.genero.descricao))
    }
    else {
    alert("Error web service")
    }
    })
    .catch(error=>{
    alert("Error server: "+error)
    })

    LoadTiposProjeto();
    LoadAreasNegocio();
    LoadEstadosOportunidades();
}

useEffect(() => {

    LoadOportunidades()
}, []);

function SendUpdate(){
    if (selectTipo === "") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira o Tipo de Projeto!',
        });
    }else if (selectEstado ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira o Estado!',
        });  
    }else if (selectArea ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira a Area de Negocio!',
        });
    }else if (campTitulo ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira o Título!',
        });   
    }else if (campEmpresa ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira a Empresa!',
        });   
    }else if (campNecessidades ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira a Necessidade!',
        });   
    }
    else
    {
        //url de backend
        const url = baseUrl+"oportunidades/update/"+ oportunidadeId
        const datapost = {
            tipodeprojeto: selectTipo,
            areadenegocio: selectArea,
            estadooportunidade: selectEstado,
            titulo: campTitulo,
            empresa: campEmpresa,
            necessidade: campNecessidades,
        }
        console.log(url)
        axios.post(url,datapost)
        .then(response=>{
            if (response.data.success===true) {
                alert(response.data.message)
            }
            else {
                alert("Error")
            }
        })
        .catch(error=>{
            alert("Error 34 "+error)
        })
    }
}


return (
<div style={{marginLeft:'15%'}}>
    <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
            <label>Titulo</label>
            <input type="text" className="form-control" placeholder="Titulo" value={campTitulo} onChange={(value)=> setcampTitulo(value.target.value)}/>
        </div>
        <div className="form-group col-md-6 form-inline">
            <label>Empresa</label>
            <input type="text" className="form-control" placeholder="Empresa" value={campEmpresa} onChange={(value)=> setcampEmpresa(value.target.value)}/>
        </div>
        <div className="form-group col-md-6">
            <label>Necessidades</label>
            <textarea type="text" className="form-control" placeholder="Necessidades" value={campNecessidades} onChange={(value)=> setcampNecessidades(value.target.value)}/>
        </div>
    </div>
    <div className="form-row">
        <div className="form-group col-md-6">
            <label htmlFor="inputState">Tipo de Projeto</label>
            <select id="inputState" className="form-control" onChange={(value)=> setSelectTipo(value.target.value)}>
                <option value={selectTipo}>{defaultTipo}</option>
                {dataTiposProjeto.filter((data) => data.tipo !== defaultTipo)
                .map((data) => {
                    return (
                        <option key={data.id} value={data.id}>{data.tipo}</option>
                    )
                })}
            </select>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="inputState">Áreas de Negócio</label>
            <select id="inputState" className="form-control" onChange={(value)=> setSelectArea(value.target.value)}>
                <option value={selectArea}>{defaultArea}</option>
                {dataAreasNegocio.filter((data) => data.area !== defaultArea)
                .map((data) => {
                    return (
                        <option key={data.id} value={data.id}>{data.area}</option>
                    )
                })}
            </select>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="inputState">Estado</label>
            <select id="inputState" className="form-control" onChange={(value)=> setSelectEstado(value.target.value)}>
                <option value={selectEstado}>{defaultEstado}</option>
                {dataEstadosOportunidade.filter((data) => data.estado !== defaultEstado)
                .map((data) => {
                    return (
                        <option key={data.id} value={data.id}>{data.estado}</option>
                    )
                })}
            </select>
        </div>

    </div>
    <button type="submit" className="btn btn-primary" onClick={()=>SendUpdate()}>Update</button>
</div>
);
}

