const page_size = 10; // Number of rows per page
let currency_data = []; // Variable to hold the data
let filtered_data = []; // Variable to hold filtered data

document.addEventListener("DOMContentLoaded", function() {
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    });

  fetchData();
});

async function fetchData() {
  let apiUrl =
    "https://api.coingecko.com/api/v3/coins/bitcoin/tickers?exchange_ids=binance&include_exchange_logo=false&page=1&order=trust_score_desc&depth=false";
  const response = await fetch(apiUrl);
  const data = await response.json();
  currency_data = data.tickers;
  filtered_data = currency_data; // Initialize filtered data to full dataset
  buildPagination();
  const current_page = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
  displayTableData(current_page);
}

function displayTableData(page) {
  const start = (page - 1) * page_size;
  const end = start + page_size;
  const paginatedData = filtered_data.slice(start, end); // Use filtered data
  const tableBody = document.getElementById("table-body");
  const name = "Bitcoin"; // Assuming name is Bitcoin

  let tableRows = "";

  paginatedData.forEach((ticker) => {
    const { base, target, last, volume, converted_volume } = ticker;

    let row = `<tr>
          <td>${name}</td>
          <td>${base}</td>
          <td>${target}</td>
          <td>${last.toLocaleString()}</td>
          <td>${volume.toLocaleString()}</td>
          <td>${converted_volume.usd.toLocaleString()}</td>
      </tr>`;

    tableRows += row;
  });

  tableBody.innerHTML = tableRows;
}

function buildPagination() {
  let total_pages = Math.ceil(filtered_data.length / page_size); // Use filtered data
  let page_html = "";

  let current_page = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

  if (current_page > 1) {
    page_html += `<a class="enable" href="?page=${current_page - 1}">&laquo;</a>`;
  } else {
    page_html += `<a class="disabled">&laquo;</a>`;
  }

  for (let index = 1; index <= total_pages; index++) {
    page_html += `<a href="?page=${index}"${
      index === current_page ? ' class="active"' : ""
    }>${index}</a>`;
  }

  if (current_page < total_pages) {
    page_html += `<a class="enable" href="?page=${current_page + 1}">&raquo;</a>`;
  } else {
    page_html += `<a class="disabled">&raquo;</a>`;
  }

  document.getElementById("pagination").innerHTML = page_html;
  addPaginationEventListeners();
}

function addPaginationEventListeners() {
  const paginationLinks = document.querySelectorAll("#pagination a.enable");
  paginationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const page = new URL(event.target.href).searchParams.get("page");
      history.pushState(null, "", `?page=${page}`);
      displayTableData(parseInt(page));
    });
  });
}

function searchFunction() {
  const inputValue = document.getElementById("search_bar").value.toUpperCase();
  filtered_data = currency_data.filter(currency => currency.base.toUpperCase().includes(inputValue));
  
  buildPagination(); // Rebuild pagination for the filtered data
  displayTableData(1); // Display the first page of filtered data
}
