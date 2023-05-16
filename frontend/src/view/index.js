import './index.css'
import { Parallax, ParallaxLayer } from '@react-spring/parallax' 
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Index() {
  
  const[btn_margin,setbtn_margin] = useState('35px')

  useEffect(() => {
    const timer = setTimeout(() => {
      setbtn_margin('0');

    },1000);
    return () => clearTimeout(timer);
  },[]);

    return (
      <div>
        <div className='btn_entrar' style={{marginLeft: btn_margin}}>
        <Link to="/home" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        Entrar
        </div>
        <div className='idioma'>
          <span className='link_atual'>pt</span> | <Link className='link'>eng</Link> | <Link className='link'>es</Link>
        </div>
        <Parallax className='index' pages={2} style={{ top: '0', left: '0' }}  impl={ParallaxLayer}>
        <ParallaxLayer style={{backgroundImage: "url('https://www.softinsa.pt/wp-content/themes/softinsa/images/banner.jpg')"}} offset={0} factor={1} speed={1}>
        </ParallaxLayer>
        <ParallaxLayer offset={0.3} speed={0.275}>
          <hr style={{width:'60%', marginLeft: '25%', marginBottom: '5%', border: '2px solid #15BBE5', opacity:'100%'}} />
          <img style={{width: '40%'}} src="https://www.neptune-software.com/wp-content/uploads/2017/11/logotipo_softinsa_2016.png" alt="" />
          <hr style={{width:'60%', marginLeft: '15%', marginTop: '5%', border: '2px solid #37649E', opacity:'100%'}} />
        </ParallaxLayer>
        
      </Parallax>
      </div>
    )   
}