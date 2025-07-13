import React from 'react';

const Navigation = ( {onRouteChange, isSignedIn, resetState} ) => {
    if(isSignedIn) {
        return(
            <div>
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={resetState} className='f3 link dim black underline pa3'>Sign Out</p>
                </nav>
            </div>
        );
    }
    else {
        return(
            <div>
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p onClick={()=>onRouteChange('signin')} className='f3 link dim black underline pa3'>Sign In</p>
                    <p onClick={()=>onRouteChange('register')} className='f3 link dim black underline pa3'>Register</p>
                </nav>
            </div>
        );
    }
}

export default Navigation;