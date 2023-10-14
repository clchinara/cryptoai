export const postData = async (url, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (err) { // for unhandled error codes
        throw err;
    }
}