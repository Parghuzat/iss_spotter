const request = require('request');


const fetchMyIP = function(callback) { 
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    
    if (error !== null) {
      callback(error, undefined);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(error, JSON.parse(body).ip)
    return;  
    
  })

}

const fetchCoordsByIP = function (ip, callback) {
  const url = `https://api.freegeoip.app/json/${ip}?apikey=8b9e6bf0-3df2-11ec-98ea-b5ee4bdc9722`;
  request(url, (error, response, body) => {
    if (error !== null) {
      callback(error, undefined);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const infos = JSON.parse(body);
    callback(error, {
      latitude: infos.latitude,
      longitude: infos.longitude
    })
    return;  
    
  })
}

const isspassing = function (infos , callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${infos.latitude}&lon=${infos.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
}



module.exports = { fetchMyIP, fetchCoordsByIP, isspassing };
