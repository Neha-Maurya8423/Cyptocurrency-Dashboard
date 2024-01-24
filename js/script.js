function tableData(sortedData) {
  for (let i in sortedData) {
    let color;
    let change = parseFloat(sortedData[i].price_change_24h).toFixed(2);
    let percentage = parseFloat(
      sortedData[i].price_change_percentage_24h
    ).toFixed(2);
    if (sortedData[i].price_change_24h > 0) {
      color = "text-success fa-solid fa-arrow-up";
    } else {
      color = "text-danger  fa-solid fa-arrow-down";
    }
    table_row = `<tr">
            <td> <div>${sortedData[i].name}</div></td>
            <td><img  class="img-fluid currency_symbol" src="${sortedData[i].image}"></td>
            <td> <div> ${sortedData[i].max_supply} </div> </td>
            <td> <div> ${sortedData[i].current_price} </div> </td>
            <td> <div class="sortedData_color  ${color}">&nbsp${change}(${percentage} %)</div> </td> 
          </tr>`;
    document.getElementById("table-body").innerHTML += table_row;
  }
}
function sortDataByPercentageChange(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < data.length - 1; j++) {
      if (
        data[j].price_change_percentage_24h <
        data[j - 1].price_change_percentage_24h
      ) {
        let temp = data[j - 1];
        data[j - 1] = data[j];
        data[j] = temp;
      }
    }
  }
  return data;
}
function fetchData() {
  let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr`;
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const sortedData = sortDataByPercentageChange(data);
      tableData(sortedData);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching currency data:", error);
    });
}
      fetchData();
