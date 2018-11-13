export function PostData(type, userData){
    let BaseUrl = "http://localhost:50882/";
    return new Promise((resolve, reject) => {
        fetch(BaseUrl+type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then( function(response){
            if(response.ok) {
                return response.json();
            }
        })
        .then((responseJson) => { resolve(responseJson); })
        .catch((error) => {
            reject(error);
        });
    });
}