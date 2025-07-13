import React from 'react';

const Rank = ( { name, entries }) => {
    return(
        <div className='f3 orange'>
            <p className='center'>Hello {name}, Welcome to Smart Brain Application.</p>
            <div className='center'>
                Your current rank is:-<strong>#{entries}</strong>
            </div>
        </div>
    );
}

export default Rank;