document.addEventListener("DOMContentLoaded", function() {
    fetch("header.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
      });
  
    // Load the watchlist data
    loadWatch();
  });
  
  function loadWatch() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistBody = document.getElementById('watchlist-body');
  
    if (watchlist.length > 0) {
      watchlistBody.innerHTML = '';
  
      watchlist.forEach(element => {
        let color;
        let change = parseFloat(element.price_change_24h).toFixed(2);
        let percentage = parseFloat(element.price_change_percentage_24h).toFixed(2);
  
        if (element.price_change_24h > 0) {
          color = "text-success fa-solid fa-arrow-up";
        } else {
          color = "text-danger fa-solid fa-arrow-down";
        }
  
        let table_row = `
          <tr>
            <td>${element.name}</td>
            <td><img class="img-fluid currency_symbol" src="${element.image}" alt="${element.name}"></td>
            <td>${element.max_supply}</td>
            <td>${element.current_price}</td>
            <td>
              <div class="sortedData_color ${color}">
                &nbsp;${change} (${percentage} %)
              </div>
            </td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="removeFromWatchlist('${element.id}', event)">Remove</button>
            </td>
          </tr>`;
  
        watchlistBody.innerHTML += table_row;
      });
    } else {
      watchlistBody.innerHTML = '<tr><td colspan="6">No items in watchlist</td></tr>';
    }
  }
  window.removeFromWatchlist = function(id, event) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(item => item.id !== id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    loadWatch();
  }
