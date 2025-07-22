import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ( { onInputChange, onButtonSubmit } ) => {

    const handler = (event)=>{
        const submit_button = document.getElementById("detect");
        if(event.key === "Enter") {
            event.preventDefault();
            submit_button.click();
        }
    }
    return(
        <div>
            <p className='f3 center'>
                This brain will detect the faces present in your pictures. Let's go ahead and give it a try!
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center'  id="img-url" type='text' 
                    placeholder='Enter your image url here...' 
                    onChange={onInputChange}
                    onKeyDown={()=>document.getElementById("img-url").addEventListener("keypress", handler)}/>
                    <button id="detect" className='w-30 grow f4 link ph3 pv2 dib bg-light-blue'onClick={onButtonSubmit} >Detect</button>
                </div>
            </div>
            <div id="error" style={{display: 'none'}} className='center f4'>
                <p id="message" className='center f4 fw6 red'></p>
            </div>
        </div>
    );
}

export default ImageLinkForm;