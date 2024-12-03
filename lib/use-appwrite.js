import { useEffect, useState } from 'react'


// used as a resuable function for fetching data all over app...
const useAppwrite = (fn) => {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // can't create async directly in useEffect so created it as a arrow function...
    const fetchData = async () => {
        // started fetching the data...
        setIsLoading(true);

        try {
            // getting getAllPosts through props and named as fn()...
            const response = await fn();

            setData(response);
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            // Done fetching data...
            setIsLoading(false);
        }
        }

    useEffect(() => {
        fetchData();
    },[]);

    // used to load existing or new data if the app refresh..
    const refetch = () => fetchData();

    return { data, isLoading, refetch };
}

export default useAppwrite