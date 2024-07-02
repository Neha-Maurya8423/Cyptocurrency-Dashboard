// // Function to parse URL parameters into an object
// function getParameters(url) {
//   if (!url) url = window.location.href;
//   let params = {};
//   let parser = new URL(url);
//   let queryString = parser.search.slice(1);
//   let pairs = queryString.split("&");

//   for (let pair of pairs) {
//     if (pair === "") continue;
//     let [key, value] = pair.split("=");
//     key = decodeURIComponent(key);
//     value = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
//     params[key] = value;
//   }

//   return params;
// }

// // Retrieve parameters
// let params = getParameters();

// // Default to 'Bitcoin' if name is not provided
// let name = params.name || "Bitcoin";
// name = name.toLowerCase();
// let image = params.image;
// let change = params.change;
// let percentage = params.percentage;
// let id = params.id||"Bitcoin";

// // Update the HTML elements
// document.getElementById("coin").innerHTML = `${name} 30 days of price change`;

// // Display the retrieved data
// var convertedDataDiv = document.getElementById("convertedData");
// if (convertedDataDiv) {
//   convertedDataDiv.innerHTML = `
//         <p>Name: ${name}</p>
//         <p>Symbol: <img src="${image}" alt="${name}" id="img"></p>
//         <p>Change: ${change}</p>
//         <p>Percentage: ${percentage} %</p>
//         <p>ID: ${id}</p>
//     `;
// }

// // API URL
// const apiUrl = `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=30&interval=daily&precision=2`;

// // Fetch data from API
// async function fetchData() {
//   const response = await fetch(apiUrl);
//   const data = await response.json();
//   return data;
// }

// // Draw chart with the fetched data
// async function drawChart(data) {
//   console.log(data);
//   const prices = data.prices.map((item) => item[1]); // Extract price values
//   const market_caps = data.market_caps.map((item) => item[1]); // Extract market cap values
//   const labels = data.prices.map((item) =>
//     new Date(item[0]).toLocaleDateString()
//   ); // Convert timestamps to dates
//   const ctx = document.getElementById("myChart").getContext("2d");

//   new Chart(ctx, {
//     type: "line",
//     data: {
//       labels,
//       datasets: [
//         {
//           label: `${name} (USD)`,
//           data: prices,
//           backgroundColor: "rgba(75, 192, 192, 0.2)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 2,
//           yAxisID: "y-axis-1",
//         },
//         {
//           label: "Market Cap (USD)",
//           data: market_caps,
//           backgroundColor: "rgba(255, 99, 132, 0.2)",
//           borderColor: "rgba(255, 99, 132, 1)",
//           borderWidth: 2,
//           yAxisID: "y-axis-2",
//         },
//       ],
//     },
//     options: {
//       scales: {
//         yAxes: [
//           {
//             id: "y-axis-1",
//             type: "linear",
//             position: "left",
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//           {
//             id: "y-axis-2",
//             type: "linear",
//             position: "right",
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//     },
//   });
// }

// // Fetch data and draw the chart
// fetchData().then((data) => drawChart(data));
// Function to parse URL parameters into an object
function getParameters(url = window.location.href) {
  const params = {};
  const parser = new URL(url);
  const queryString = parser.search.slice(1);
  const pairs = queryString.split("&");

  for (const pair of pairs) {
    if (!pair) continue;
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
  }

  return params;
}

// Update the HTML elements with the retrieved data
function updateHtmlElements({ name, image, change, percentage, id }) {
  document.getElementById("coin").innerHTML = `${name} 30 days of price change`;

  const convertedDataDiv = document.getElementById("convertedData");
  if (convertedDataDiv) {
    convertedDataDiv.innerHTML = `
      <p>Name: ${name}</p>
      <p>Symbol: <img src="${image}" alt="${name}" id="img"></p>
      <p>Change: ${change}</p>
      <p>Percentage: ${percentage} %</p>
      <p>ID: ${id}</p>
    `;
  }
}

// Fetch data from the API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Draw chart with the fetched data
function drawChart(data, name) {
  const prices = data.prices.map((item) => item[1]);
  const marketCaps = data.market_caps.map((item) => item[1]);
  const labels = data.prices.map((item) => new Date(item[0]).toLocaleDateString());

  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `${name} (USD)`,
          data: prices,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          yAxisID: "y-axis-1",
        },
        {
          label: "Market Cap (USD)",
          data: marketCaps,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          yAxisID: "y-axis-2",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            id: "y-axis-1",
            type: "linear",
            position: "left",
            ticks: {
              beginAtZero: true,
            },
          },
          {
            id: "y-axis-2",
            type: "linear",
            position: "right",
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

// Main function to handle fetching and displaying data
async function main() {
  const params = getParameters();
  const name = params.name ? params.name.toLowerCase() : "bitcoin";
  const image = params.image;
  const change = params.change;
  const percentage = params.percentage;
  const id = params.id || "bitcoin";

  updateHtmlElements({ name, image, change, percentage, id });

  const apiUrl = `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=30&interval=daily&precision=2`;

  const data = await fetchData(apiUrl);
  if (data) {
    drawChart(data, name);
  }
}

// Execute main function on page load
document.addEventListener("DOMContentLoaded", main);
