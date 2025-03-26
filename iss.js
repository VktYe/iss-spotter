
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
*/
const needle = require('needle');
const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  needle.get("http://api.ipify.org?format=json", (err, response) => {
    if (err) {
      callback(err, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
      const data = response.body;
      if (data && data.ip) {
        callback(null, data.ip);
        
      } else {
        callback(new Error("IP address not found"), null)
      }
    
  }) 
}
module.exports = { fetchMyIP };