import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../stores/store';


export default observer(function ServerError() {
    const {commonStore} = useStore();

    return (
        <div>
            <h1>Server Error</h1>
            <h5>{commonStore.error?.message}</h5>
            {commonStore.error?.details &&
                <div>
                    <h4>Stack trace</h4>
                    <code style={{marginTop: '10px'}}>{commonStore.error.details}</code>
                </div>
                
            }
        </div>
    )
})