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
        if (!response.ok) {
            throw new Error('Response not ok');
        }
        const responseData = await response.json();
        return responseData;
    } catch (err) {
        throw err;
    }
}