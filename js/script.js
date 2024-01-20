
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
          document.getElementById("table-body").innerHTML += `<tr>
            <td> <div>${data[i].name }</div></td>
            <td><img  class="img-fluid currency_symbol" src="${data[i].image }"></td>
            <td> <div> ${data[i].max_supply} </div> </td>
            <td> <div> ${data[i].current_price} </div> </td>
            <td> <div> ${data[i].price_change_24h} </div> </td>
            <td> <div> ${data[i].price_change_percentage_24h} </div> </td>
          </tr>`;
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });