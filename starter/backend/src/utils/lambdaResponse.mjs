
export function createResponse({
    body,
    status = 200,
    additionalHeaders = {}
}){
    if(typeof body == "object"){
        body = JSON.stringify(body);
    }

    return {
        body,
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            ...additionalHeaders
        }
    }
}