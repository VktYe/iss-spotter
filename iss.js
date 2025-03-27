const needle = require('needle');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  needle.get("http://api.ipify.org?format=json", (err, response, body) => {
    if (err) {
      return callback(err, null);
    }

    if (response.statusCode !== 200) {
      callback(new Error(`HTTP Status: ${response.statusCode}`), null);
      return;
    }
    const ip = body.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (err, response, body) =>{
   
    if (err) {
      return callback(err, null);
    }
    
    if (!body.success) { // if success: false - IP address doesn't exist
      const msg = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(new Error(msg), null);
      return;
    }
    
    const latitude = body.latitude;
    const longitude = body.longitude;
    callback(null, {latitude, longitude});

  
  });
 
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  //
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  needle.get(url, (err, response, body) =>{
   
    if (err) {
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      callback(new Error(`HTTP Status: ${response.statusCode}`), null);
      return;
    }

    const passTime = body.response;
    callback(null, passTime);
  
  });

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIp,
  fetchISSFlyOverTimes
};