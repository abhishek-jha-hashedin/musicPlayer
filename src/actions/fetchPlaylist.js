import React from "react";

var musicURL = (songID) => {
    fetch('http://mosaic.nativebyte.in/api/music/' + songID + '/content/resolve', {
        method: 'get',
        headers: {
            'Authorization': localStorage.getItem('jwtToken'),
        },
    }).then(response =>response.json())
    .then((resp)=>{
        return resp['data'];
    })
}
export default musicURL;