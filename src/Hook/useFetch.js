import { useEffect, useState } from "react";
import { GET } from '../API/APIconfig.js'


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(url, GET)
        .then(res => res.json())
        .then(dataResponse => {
            setLoading(false);
            setData(dataResponse);
        })
        .catch(err => {
            console.error('algo deu errado...');
            console.error(err);
        })
    }, [url])
    return [data, loading, setData];
}

export default useFetch;