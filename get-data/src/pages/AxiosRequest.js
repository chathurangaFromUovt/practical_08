import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosRequest() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://helpme.apis.lk/api/service')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

export default AxiosRequest;