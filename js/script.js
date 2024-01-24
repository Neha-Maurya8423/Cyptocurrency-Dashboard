function tableData(sortedData) {
  let table_rows = ""

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
    table_rows += table_row
  }
  document.getElementById("table-body").innerHTML = table_rows;
}

function sortDataByPercentageChange(type, currency_data, sortBy = true) {
  for (let i = 0; i < currency_data.length; i++) {
    for (let j = 1; j < currency_data.length; j++) {
      if (sortBy) {
        if (currency_data[j][type] > currency_data[j - 1][type]) {
          let temp = currency_data[j - 1];
          currency_data[j - 1] = currency_data[j];
          currency_data[j] = temp;
        }
      }
      else {
        if (currency_data[j][type] < currency_data[j - 1][type]) {
          let temp = currency_data[j - 1];
          currency_data[j - 1] = currency_data[j];
          currency_data[j] = temp;
        }
      }

    }
  }
  return currency_data;
}


async function fetchData() {
  let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr`;
  const response = await fetch(apiUrl)
  return response.json()
}

var currency_data;
async function loadData(type = undefined, sortBy = true) {
  console.log(currency_data)
  if (!currency_data) {
    //to cache the response of API
    currency_data = await fetchData();
  }

  if (type) {
    currency_data = sortDataByPercentageChange(type, currency_data, sortBy);
  }

  tableData(currency_data);
}

document.addEventListener("DOMContentLoaded", function (event) {
  loadData();
});

document.getElementById("price-up-arrow").addEventListener("click", function (event) {
  document.getElementById("price-up-arrow").style.display = "none"
  document.getElementById("price-down-arrow").style.display = "unset"
  loadData("price_change_percentage_24h");
});

document.getElementById("price-down-arrow").addEventListener("click", function (event) {
  document.getElementById("price-up-arrow").style.display = "unset"
  document.getElementById("price-down-arrow").style.display = "none"
  loadData("price_change_percentage_24h", false);
});
