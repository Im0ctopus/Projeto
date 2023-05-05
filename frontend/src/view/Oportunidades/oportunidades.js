import './oportunidades.css'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import Popup from './Popup';


export default function OportunidadesList(){
    const [dataOportunidades, setdataOportunidades] = useState([]);
    
    function LoadOportunidades() {
        const url = "http://localhost:3000/oportunidades/list";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataOportunidades(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }
    
    useEffect(() => {
        LoadOportunidades();
    },[]);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedOpportunity, setSelectedOpportunity] = useState({});

    function handleCardClick(data) {
        setSelectedOpportunity(data);
        setShowPopup(true);
    }


    function LoadFillData(){
        const sortedData = dataOportunidades.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
        return sortedData.map((data)=>{
        return(
                <div key={data.id} className="col-lg-4 no-modal">
                    <div className="card card-margin" onClick={() => handleCardClick(data)}>
                        <div className="card-header no-border">
                            <h4 className="card-title mt-3">{data.titulo}</h4>
                            <h6>criada por: {data.user.primeiro_nome} {data.user.ultimo_nome} {data.data_criacao.slice(0,10)}</h6> 
                        </div>
                        <div className="card-body pt-0">
                            <div className="widget-49">
                                <div className="widget-49-meeting-points mt-3 ml-5">
                                    <div>
                                        <strong>Nome da Empresa</strong>
                                        <p>{data.empresa}</p>
                                    </div>
                                    <div style={{paddingRight: '60px'}}>
                                        <strong>Estado</strong>
                                        <div className='bola'
                                        style={{backgroundColor:data.estadosoportunidadeId === 2 ? "#24bb29" :
                                        data.estadosoportunidadeId === 3 ? "#f3fa39" : 
                                        data.estadosoportunidadeId === 4 ? "red" : 
                                        data.estadosoportunidadeId === 5 ? "blue" : "#e0e3e7"}}
                                        >
                                        <div className='estado'>
                                            {data.estadosoportunidade.estado}
                                       </div>
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="widget-49-meeting-points mt-2">
                                    <div>
                                        <strong>Tipo de Projeto</strong>
                                        <p>{data.tiposdeprojeto.tipo}</p>
                                    </div>
                                    <div>
                                        <strong>Área de Negócio</strong>
                                        <p>{data.areasdenegocio.area}</p>
                                        
                                    </div>
                                </div>
                                <div className="widget-49-meeting-action">
                                    <h6>Data de Atualização: {data.data_atualizacao.slice(0,10)}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            )
        });
    }

    return (
    <div className='oportunidades'>
        {showPopup && (
                <Popup selectedOpportunity={selectedOpportunity} onClose={() => setShowPopup(false)} />
            )}
        <div className="container">
        <Link to='/oportunidades/create' className='btn_adicionar_op'>Criar Nova</Link>

            <div className="row">
                <LoadFillData />
            </div>
        </div>
    </div>
    );
}