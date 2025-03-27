const { fetchISSFlyOverTimes } = require('./iss');

const myCords = { latitude: 45.3068484, longitude: -66.015506 };

fetchISSFlyOverTimes(myCords, (error, passTime) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
        
  console.log('It worked! Returned passTime: ', passTime);
});

// fetchCoordsByIp("159.2.196.119", (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
    
//   console.log('It worked! Returned data:' , data);
// });

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });