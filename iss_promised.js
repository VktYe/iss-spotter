const needle = require('needle');
/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */

const fetchMyIP = function() {
  
   return needle('get', 'http://api.ipify.org?format=json') 
   .then((response) => {
     const body = response.body;
     const ip = body.ip;
     return ip
     })


};

const fetchCoordsByIp = function(ip) {

  return needle('get', `http://ipwho.is/${ip}`)
  .then((response) => {
    const body = response.body; //retrieve lotitude from response
    const latitude = body.latitude; //retrieve latitude from body
    const longitude = body.longitude; // retrieve longitude from bosy
    return {latitude, longitude}
  });

};

const fetchISSFlyOverTimes = function(coords) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  return needle('get', url)
  .then((response) => {
    const body = response.body;
    const passTimes = body.response;
    return passTimes;
  })

};

const nextISSTimesForMyLocation = function(passTimes) {
  return fetchMyIP()
  .then((ip) => fetchCoordsByIp(ip))
  .then((coords) => fetchISSFlyOverTimes(coords))
  .then((passTimes) => {
    return passTimes;
  });

};


module.exports = { 
  nextISSTimesForMyLocation
 };
