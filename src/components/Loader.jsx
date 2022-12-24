import React from 'react'

const Loader = (props) => {
    return (
        <div className="fixed inset-0 z-10 bg-[rgba(0,0,0,0.6)] flex justify-center items-center flex-auto">
            <div className="lds-hourglass"></div>
        </div>
    );
};
export default Loader;