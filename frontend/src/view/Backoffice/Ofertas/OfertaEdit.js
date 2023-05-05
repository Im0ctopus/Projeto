import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import React ,{useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const baseUrl = "http://localhost:3000/";

export default function OfertaEditBO(){

const [dataTiposOfertas, setdataTiposOfertas] = useState([]);
const [dataEstadosOfertas, setdataEstadosOfertas] = useState([]);

const {ofertaId} = useParams();
const [campTitulo, setcampTitulo] = useState("");
const [campDepartamento, setcampDepartamento] = useState("");
const [campLocalizacao, setcampLocalizacao] = useState("");
const [campExpAnterior, setcampExpAnterior] = useState("");
const [campExpAnteriorBoolean, setcampExpAnteriorBoolean] = useState(false);

const [campTempExpAnterior, setcampTempExpAnterior] = useState("");

const [campHabMin, setcampHabMin] = useState("");
const [campRenumeracao, setcampRenumeracao] = useState("");
const [campDescricao, setcampDescricao] = useState("");
const [campImagem, setcampImagem] = useState("");


const [defaultTipo, setDefaultTipo] = useState("");
const [selectTipo, setSelectTipo] = useState("");
const [stringTipo, setstringTipo] = useState("");

const [defaultEstado, setDefaultEstado] = useState("");
const [selectEstado, setSelectEstado] = useState("");
const [stringEstado, setstringEstado] = useState("");



const LoadTiposOfertas = () =>{
    const url = "http://localhost:3000/tipos/ofertas/list";
    axios.get(url)
    .then(res => {
        if(res.data.success){
            const data = res.data.data;
            setdataTiposOfertas(data);
        }else{
            alert("Error Web Service!");
        }
    })
    .catch(error => {
        alert(error)
    });
}

const LoadEstadosOfertas = () =>{
    const url = "http://localhost:3000/estado/ofertasvagas/list";
    axios.get(url)
    .then(res => {
        if(res.data.success){
            const data = res.data.data;
            setdataEstadosOfertas(data);
        }else{
            alert("Error Web Service!");
        }
    })
    .catch(error => {
        alert(error)
    });
}


const LoadOferta = () =>{
    const url = baseUrl+"ofertas/get/" + ofertaId;
    axios.get(url)
    .then(res=>{
    if (res.data.success) {
        const data = res.data.data[0];
        console.log(data);
        setcampTitulo(data.titulo)
        setcampDepartamento(data.departamento)
        setcampLocalizacao(data.localizacao)

        setSelectTipo(data.tiposofertavagaId);
        setDefaultTipo(data.tiposofertavaga.tipo)
        setstringTipo(data.tiposofertavaga.tipo)

        setSelectEstado(data.estadosofertavagaId);
        setDefaultEstado(data.estadosofertavaga.estado)
        setstringEstado(data.estadosofertavaga.estado)

        setcampExpAnterior(data.experiencia_anterior)
        if(data.experiencia_anterior === 1)
        {
            setcampExpAnteriorBoolean(true)
        }

        setcampTempExpAnterior(data.tempo_minimo_de_experiencia)
        setcampHabMin(data.habilitacoes_minimas)
        setcampRenumeracao(data.renumeracao_base_iliquida)
        setcampDescricao(data.descricao)
        setcampImagem(data.imagem)

        // console.log(JSON.stringify(data.genero.descricao))
    }
    else {
    alert("Error web service")
    }
    })
    .catch(error=>{
    alert("Error server: "+error)
    })

    LoadTiposOfertas();
    LoadEstadosOfertas();
}

useEffect(() => {
    LoadOferta();
}, []);


function SendUpdate(){
    if (selectTipo === "") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira o Tipo de Oferta!',
        });
    }
    else if (selectEstado ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira o Estado!',
        });   
    }else if (campTitulo ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira o Título!',
        });   
    }else if (campDepartamento ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira o Departamento!',
        });   
    }else if (campLocalizacao ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira a Necessidade!',
        });     
    }else if (campExpAnteriorBoolean === false) {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira a Experiência Anterior!',
        });     
    }else if (campHabMin ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira as Habilitações Mínimas!',
        });     
    }else if (campRenumeracao ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira a Renumeração Base Ilíquida!',
        });     
    }else if (campDescricao ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira a descrição!',
        });     
    }else if (campImagem ==="") {
        Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Insira a imagem!',
        });     
    }
    else
    {
        //url de backend
        const url = baseUrl+"ofertas/update/"+ ofertaId
        if(campExpAnteriorBoolean === false)
        {
            setcampTempExpAnterior("sem experiencia")
        }
        const datapost = {
            estadoofertavaga: selectEstado,
            tipoofertavaga: selectTipo,
            titulo: campTitulo,
            departamento: campDepartamento,
            localizacao: campLocalizacao,
            experiencia_anterior: campExpAnteriorBoolean ? 1 : 0,
            tempo_minimo_de_experiencia: campExpAnteriorBoolean ? campTempExpAnterior : "sem experiencia",
            habilitacoes_minimas: campHabMin,
            renumeracao_base_iliquida: campRenumeracao,
            descricao: campDescricao,
            imagem : campImagem,
        }
        console.log(datapost)
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
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Tipo de Projeto</label>
                    <select id="inputState" className="form-control" onChange={(value)=> setSelectTipo(value.target.value)}>
                        <option value={selectTipo}>{defaultTipo}</option>
                        {dataTiposOfertas.filter((data) => data.tipo !== defaultTipo)
                        .map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.tipo}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputState">Estado</label>
                    <select id="inputState" className="form-control" onChange={(value)=> setSelectEstado(value.target.value)}>
                        <option value={selectEstado}>{stringEstado}</option>
                        {dataEstadosOfertas.filter((data) => data.estado !== defaultEstado)
                        .map((data) => {
                            return (
                                <option key={data.id} value={data.id}>{data.estado}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="form-group col-md-6">
                <label>Departamento</label>
                <input type="text" className="form-control" placeholder="Departamento" value={campDepartamento} onChange={(value)=> setcampDepartamento(value.target.value)}/>
            </div>
            <div className="form-group col-md-6">
                <label>Localização</label>
                <textarea type="text" className="form-control" placeholder="Localização" value={campLocalizacao} onChange={(value)=> setcampLocalizacao(value.target.value)}/>
            </div>
            <div class="form-check">
                <label class="form-check-label">Experiência Anterior</label>
                <input class="form-check-input" type="checkbox"  checked={campExpAnteriorBoolean} onChange={(value) => setcampExpAnteriorBoolean(value.target.checked)}/>
            </div>
            {campExpAnteriorBoolean && 
            <div className="form-group col-md-6">
                <label>Tempo Mínimo de Experiencia</label>
                <input type="text" className="form-control" placeholder="Tempo Mínimo de Experiencia" value={campTempExpAnterior} onChange={(value)=> setcampTempExpAnterior(value.target.value)}/>
            </div>
            }
            <div className="form-group col-md-6">
                <label>Habilitações Mínimas</label>
                <textarea type="text" className="form-control" placeholder="Habilitações Mínimas" value={campHabMin} onChange={(value)=> setcampHabMin(value.target.value)}/>
            </div>
            <div className="form-group col-md-6">
                <label>Renumeração Base Ilíquida</label>
                <input type="text" className="form-control" placeholder="Renumeração Base Ilíquida" value={campRenumeracao} onChange={(value)=> setcampRenumeracao(value.target.value)}/>
            </div>
            <div className="form-group col-md-6">
                <label>Descricão</label>
                <textarea type="text" className="form-control" placeholder="Descricão" value={campDescricao} onChange={(value)=> setcampDescricao(value.target.value)}/>
            </div>
            <div className="form-group col-md-6">
                <label>Imagem</label>
                <input type="text" className="form-control" placeholder="Imagem" value={campImagem} onChange={(value)=> setcampImagem(value.target.value)}/>
            </div>
        </div>
        <button type="submit" class="btn btn-primary" onClick={()=>SendUpdate()}>Update</button>
    </div>
    );
}

