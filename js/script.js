
// function fetch_live_currency(){
//  var response;
// const key = "3cf227b4196e023696b8a5681554ba15";
// let apiUrl = `http://api.coinlayer.com/live?access_key=${key}`;
// fetch(apiUrl)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     response = data;

//     for (let keys in response.rates) {
//       document.querySelector(
//         ".table-body"
//       ).innerHTML += `<tr><td> ${response.success}</td><td> ${response.timestamp}</td><td> ${keys}</td><td> ${response.rates[keys]}</td></tr>`;
//     }
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error fetching currency data:", error);
//   });
// }

 //https://api.coinpaprika.com/v1/global
    var response;
    const key = "3cf227b4196e023696b8a5681554ba15";
    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr`;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        for (let i in data) {
          document.querySelector(
            ".table-head"
          ).innerHTML += `<tr><td> ${data[i].name }</td><td><img  class="currency_symbol" src="${data[i].image }"></td><td> ${data[i].max_supply
          }</td></td><td> ${data[i].current_price
          }</td></td><td> ${data[i].price_change_24h
          }</td><td> ${data[i].price_change_percentage_24h
          }</td>price_change_percentage_24h
          </tr>`;
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });