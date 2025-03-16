import React, { useState } from 'react';

function XMLRequest() {
    const [data, setData] = useState(null);

    function getData() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://helpme.apis.lk/api/service');

        xhr.onload = function () {
            if (xhr.status === 200) {
                setData(JSON.parse(xhr.responseText));
            }
        };

        xhr.send();
    }

    return (
        <div>
            <button onClick={getData}>Get Data</button>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <div>Loading...</div>}
        </div>
    );
}

export default XMLRequest;
