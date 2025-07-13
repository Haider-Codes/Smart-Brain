import React from 'react';
import brain from './smart-brain.png';
import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {

    const width = '150px';
    const height = '150px';

    return(
        <div className=' ma mt4 pa3'>
            <Tilt className='tilt br2 shadow-2 w-10'>
            <img src={brain} alt='smart-brain-logo' width={width} height={height}/> 
            </Tilt>
        </div>
    );
}

export default Logo;