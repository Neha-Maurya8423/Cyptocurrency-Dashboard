document.addEventListener("DOMContentLoaded", function() {
  fetch("header.html")

    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    });
});

function tableData(sortedData) {
  let table_rows = "";

  for (let i in sortedData) {
    let color;
    let change = parseFloat(sortedData[i].price_change_24h).toFixed(2);
    let percentage = parseFloat(
      sortedData[i].price_change_percentage_24h
    ).toFixed(2);

    if (sortedData[i].price_change_24h > 0) {
      color = "text-success fa-solid fa-arrow-up";
    } else {
      color = "text-danger fa-solid fa-arrow-down";
    }
    let queryString = `?name=${encodeURIComponent(
      sortedData[i].name
    )}&image=${encodeURIComponent(sortedData[i].image)}&change=${encodeURIComponent(
      change
    )}&percentage=${encodeURIComponent(percentage)}&id=${encodeURIComponent(id)}`;

    // Use a single anchor tag around the entire row
    let table_row = `
      <tr class="sortedData_color" onclick="window.location.href='conveter.html${queryString}'">
        <td>${sortedData[i].name}</td>
        <td><img class="img-fluid currency_symbol" src="${sortedData[i].image}" alt="${sortedData[i].name}"></td>
        <td>${sortedData[i].max_supply}</td>
        <td>${sortedData[i].current_price}</td>
        <td>
          <div class="sortedData_color ${color}">
            &nbsp;${change} (${percentage} %)
          </div>
        </td>  
<td>
          <button class="btn btn-success btn-sm" onclick="addToWatchlist('${sortedData[i].id}', event)">Add to Watchlist</button>
        </td>

      </tr>`
      
      ;
    table_rows += table_row;
  }

  document.getElementById("table-body").innerHTML = table_rows;
}

function getParameterByName(name, url = window.location.href) {
  const params = new URL(url).searchParams;
  return params.get(name) || null;
}

// Retrieve data from URL parameters
var name = getParameterByName("name");
var image = getParameterByName("image");
var change = getParameterByName("change");
var percentage = getParameterByName("percentage");
var id = getParameterByName("id");

// Display the retrieved data
var convertedDataDiv = document.getElementById("convertedData");
if (convertedDataDiv) {
  convertedDataDiv.innerHTML = `
    <p>Name: ${name}</p>
    <img src="${image}" alt="${name}">
    <p>Change: ${change}</p>
    <p>Percentage: ${percentage} %</p>
    <p>ID: ${id}</p>
  `;
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
      } else {
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
  const response = await fetch(apiUrl);
  return response.json();
}

var currency_data;
async function loadData(
  type = undefined,
  sortBy = true,
  page_size = 10,
  page_number = 1
) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (params.get("page")) {
    page_number = params.get("page");
  }

  // tableData()

  if (!currency_data) {
    //to cache the response of API
    currency_data = await fetchData();
  }

  if (type) {
    currency_data = sortDataByPercentageChange(type, currency_data, sortBy);
  }

  const start = page_number * page_size - page_size;
  const end = page_number * page_size;
  tableData(currency_data.slice(start, end));
}

function buildPagination(page_size = 10) {
  let total_pages = Math.ceil(currency_data.length / page_size);
  let page_html = "";

  let current_page =
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

  if (current_page > 1) {
    page_html += `<a class="enable" href="index.html?page=${
      current_page - 1
    }">&laquo;</a>`;
  } else {
    page_html += `<a class="disabled">&laquo;</a>`;
  }

  // Add page numbers
  for (let index = 1; index <= total_pages; index++) {
    page_html += `<a href="index.html?page=${index}"${
      index === current_page ? ' class="active"' : ""
    }>${index}</a>`;
  }

  if (current_page < total_pages) {
    page_html += `<a class="enable" href="index.html?page=${
      current_page + 1
    }">&raquo;</a>`;
  } else {
    page_html += `<a class="disabled">&raquo;</a>`;
  }

  document.getElementById("pagination").innerHTML = page_html;
  
}


document.addEventListener("DOMContentLoaded", async function (event) {
  await loadData();
  buildPagination();
});

document
  .getElementById("price-up-arrow")
  .addEventListener("click", function (event) {
    document.getElementById("price-up-arrow").style.display = "none";
    document.getElementById("price-down-arrow").style.display = "unset";
    loadData("price_change_percentage_24h");
  });

document
  .getElementById("price-down-arrow")
  .addEventListener("click", function (event) {
    document.getElementById("price-up-arrow").style.display = "unset";
    document.getElementById("price-down-arrow").style.display = "none";
    loadData("price_change_percentage_24h", false);
  });
  
  function searchFunction() {
    let display_data = [];
    const input_value = document.getElementById("search_bar").value.toUpperCase();
  
    for (let i in currency_data) {
      if (currency_data[i].name.toUpperCase().indexOf(input_value) > -1) {
        display_data.push(currency_data[i]);
      }
    }
    tableData(display_data);
  }
  // Add this function to script.js
function addToWatchlist(id) {
  const item=currency_data.find(coin=>coin.id===id);
  if(item)
    {
      let watchlist=JSON.parse(localStorage.getItem("watchlist"))||[];
      if(!watchlist.find(existingItem=>existingItem.id===id))
        { 
          watchlist.push(item);
          localStorage
          .setItem('watchlist',JSON.stringify(watchlist));
        }
    }
  }


  
