import './ofertas.css'
import {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import Popup from './Popup';


export default function OfertavagaList(){
    const [dataOfertavaga, setdataOfertavaga] = useState([]);
    
    function LoadOfertavaga() {
        const url = "http://localhost:3000/ofertas/list";
        axios.get(url)
        .then(res => {
            if(res.data.success){
                const data = res.data.data;
                setdataOfertavaga(data);
            }else{
                alert("Error Web Service!");
            }
        })
        .catch(error => {
            alert(error)
        });
    }
    
    useEffect(() => {
        LoadOfertavaga();
    },[]);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedOfertavaga, setSelectedOfertavaga] = useState({});

    function handleCardClick(data) {
        setSelectedOfertavaga(data);
        setShowPopup(true);
    }


    function LoadFillData(){
        const sortedData = dataOfertavaga.sort((a, b) => new Date(b.data_criacao) - new Date(a.data_criacao));
        return sortedData.map((data)=>{
            if (data.estadosofertavaga.id === 1){
                return(
                    <div key={data.id} className="col-lg-4 no-modal">
                        <div className="card card-margin" onClick={() => handleCardClick(data)}>
                            <div className="card-header no-border">
                                <h4 className="card-title mt-3">{data.titulo}</h4>
                            </div>
                            <div className="card-body pt-0">
                                <div className="widget-49">
                                    <div className="widget-49-meeting-points mt-3 ml-5">
                                        <div>
                                            <strong>Departamento</strong>
                                            <p>{data.departamento}</p>
                                        </div>
                                        <div>
                                            <strong style={{marginRight: '60px'}}>Localização</strong>
                                            <p>{data.localizacao}</p>
                                        </div>
                                    </div>
                                    <div className="widget-49-meeting-points mt-2">
                                        <div style={{paddingRight: '60px'}}>
                                            <strong>Experiencia Anterior</strong>
                                            <div className='bola'
                                            style={{backgroundColor:data.experiencia_anterior === 1 ? "#24bb29" : "red"}}
                                            >
                                            <div className='estado'>
                                            {data.tempo_minimo_de_experiencia}
                                           </div>
                                            </div>
                                           
                                        </div>
                                        <div>
                                            <strong>Habilitações minimas</strong>
                                            <p>{data.habilitacoes_minimas}</p>
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
            }
            return null;
        });
    }

    return (
    <div className='ofertas'>
        {showPopup && (
                <Popup selectedOfertavaga={selectedOfertavaga} onClose={() => setShowPopup(false)} />
            )}
        <div className="container">
        <Link to='/ofertas/criar' className='btn_adicionar_op'>Criar Nova</Link>

            <div className="row">
                <LoadFillData />
            </div>
        </div>
    </div>
    );
}