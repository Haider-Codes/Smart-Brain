import React from 'react';
import FaceBox from './FaceBox';

const FaceRecognition = ( { imageUrl, box } ) => {
    
        if(box.length === 0){
            return(
                <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'/>
                </div>
            </div>
            );
        }
        return(
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'/>
                    <FaceBox box={box} />
                </div>
            </div>
        );
}


export default FaceRecognition;