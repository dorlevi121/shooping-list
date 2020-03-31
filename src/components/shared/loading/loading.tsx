import React from 'react'
import loadingStyle from './loading.module.scss';

const Loading = () => {
    return (
        <div className={loadingStyle.Loading}>
            <div className={loadingStyle.Load}></div>
        </div>
    )
}

export default Loading;
