import { useEffect, useState } from "react"

const useFetch = (url, initialData) => {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch(error => setError(error.message))
        .finally(() => setLoading(false))
    }, [url])

    return {loading, data, error}
};

export default useFetch;