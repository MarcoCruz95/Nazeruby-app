const updateSessionId = (newSSID) => {
    return {
        type: 'updateSessionId',
        payload: newSSID
    }
}

export default updateSessionId;