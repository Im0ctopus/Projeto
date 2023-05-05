import React from "react";
import './Popup.css'

function Popup(props) {
    const { selectedOfertavaga, onClose } = props;
    console.log(props)

    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-inner big-text" onClick={(e) => e.stopPropagation()}>
            <div key={selectedOfertavaga.id} className="col-lg-4 teste">
                    <div className="card popup-card card-margin">
                    <button className="close-btn" onClick={onClose}>X</button>
                            <div className="card-header no-border">
                                <h4 className="card-title mt-3">{selectedOfertavaga.titulo}</h4>
                            </div>
                            <div className="card-body pt-0">
                                <div className="widget-49">
                                    <div className="widget-49-meeting-points mt-2 ml-5">
                                        <div>
                                            <strong>Departamento</strong>
                                            <p>{selectedOfertavaga.departamento}</p>
                                        </div>
                                        <div>
                                            <img className="imagem" src={selectedOfertavaga.imagem} alt="Image..." />
                                        </div>
                                    </div>
                                    <div className="widget-49-meeting-points mt-3">
                                        <div style={{paddingRight: '60px'}}>
                                            <strong>Experiencia Anterior</strong>
                                            <div className='bola'
                                            style={{backgroundColor:selectedOfertavaga.experiencia_anterior === 1 ? "#24bb29" : "red"}}
                                            >
                                            <div className='estado'>
                                            {selectedOfertavaga.tempo_minimo_de_experiencia}
                                           </div>
                                            </div>
                                        </div>
                                        <div>
                                            <strong style={{marginRight: '90px'}}>Localização</strong>
                                            <p>{selectedOfertavaga.localizacao}</p>
                                        </div>
                                        <div>
                                            <strong>Habilitações minimas</strong>
                                            <p>{selectedOfertavaga.habilitacoes_minimas}</p>
                                        </div> 
                                    </div>
                                    <div className="widget-49-meeting-points mt-1">
                                        <div style={{paddingRight: '60px'}}>
                                            <strong>Descrição</strong>
                                            <p>{selectedOfertavaga.descricao}</p>
                                        </div> 
                                    </div>
                                    <div className="widget-49-meeting-action">
                                        <h6>Data de Atualização: {selectedOfertavaga.data_atualizacao.slice(0,10)}</h6>
                                    </div>
                                </div>
                            </div>                   
                    </div>
                </div>
            </div>
        </div>   
    );
}
export default Popup