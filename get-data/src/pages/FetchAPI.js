import React, { useState, useEffect } from 'react';

function FetchAPI() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://helpme.apis.lk/api/service')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
        </div>
    );
}

export default FetchAPI;