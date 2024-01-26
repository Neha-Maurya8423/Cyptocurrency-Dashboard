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

function sortDataByPercentageChange(type, data, sortBy = true) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < data.length; j++) {
      if (sortBy) {
        if (data[j][type] > data[j - 1][type]) {
          let temp = data[j - 1];
          data[j - 1] = data[j];
          data[j] = temp;
        }
      }
      else {
        if (data[j][type] < data[j - 1][type]) {
          let temp = data[j - 1];
          data[j - 1] = data[j];
          data[j] = temp;
        }
      }

    }
  }
  return data;
}


async function fetchData() {
  let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr`;
  const response = await fetch(apiUrl)
  return response.json()
}

var currency_data;
async function loadData(type = undefined, sortBy = true, page_size=10, page_number=1) {

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (params.get("page")){
    page_number = params.get("page")
  }
  // tableData()

  if (!currency_data) {
    //to cache the response of API
    currency_data = await fetchData();
  }

  if (type) {
    currency_data = sortDataByPercentageChange(type, currency_data, sortBy);
  }

  const start = page_number*page_size - page_size
  const end = page_number*page_size 
  tableData(currency_data.slice(start, end));
}

function buildPagination(page_size=10){
  page_html = ''
  for (let index = 1; index <= Math.ceil(currency_data.length/page_size); index++) {
    page_html += `<a href="/?page=${index}">${index}</a>`
  }
  document.getElementById("pagination").innerHTML = page_html;
}

document.addEventListener("DOMContentLoaded", async function (event) {
  await loadData();
  buildPagination();
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
