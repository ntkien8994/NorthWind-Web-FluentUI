import React from 'react';
import { Overlay, Spinner } from '@fluentui/react';
const GisOverlay = (props) => {
    
    return (
        <Overlay isDarkThemed={true} >
            <div className='cls-overlay'>
                <Spinner {...props} />
            </div>
        </Overlay>
    )
}
export default GisOverlay;