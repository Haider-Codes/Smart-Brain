import React from 'react';
import './FaceBox.css';

const FaceBox = ( { box } ) => {
    console.log("Box at facebox: ", box);
    const faces = box.map((face, i) => {
        return(
            <div key={i} className='bounding-box'
                style={{top: face?.top_row, right: face?.right_col, bottom: face?.bottom_row, left: face?.left_col}}></div>
        );
    })

    return(
        <div>
            {faces}
        </div>
    );
        
    
}

export default FaceBox;