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

module.exports = {
  fetchMyIP,
  fetchCoordsByIp
};