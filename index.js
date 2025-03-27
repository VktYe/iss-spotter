// index.js
const { fetchCoordsByIp } = require('./iss');

fetchCoordsByIp("159.2.196.119", (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
    
  console.log('It worked! Returned data:' , data);
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });