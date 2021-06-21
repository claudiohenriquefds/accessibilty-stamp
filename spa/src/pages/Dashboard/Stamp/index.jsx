import React from 'react';

import Navbar from '../../../components/Navbar';

const Stamp = () => (
    <>
        <Navbar current="stamp" search="selo" />
        <div className="grid grid-cols-1 md:grid-cols-1">
            <div className="flex flex-col m-3">
                Texto
            </div>
        </div>
    </>
);

export default Stamp;
