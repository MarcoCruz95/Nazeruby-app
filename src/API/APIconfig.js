const GET = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    }
};

const postAction = (bd) => {
    return {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization:`Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
        body: bd
    }
}

const deleteAction = (bd) => {
    return {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
        body: bd
    }
}



export { GET, postAction, deleteAction };