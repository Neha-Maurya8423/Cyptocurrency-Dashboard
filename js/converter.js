const key='3cf227b4196e023696b8a5681554ba15'
const currentDate = "2024";
console.log(currentDate);
let apiUrl=(`http://api.coinlayer.com/convet?access_key=${key}&from=BTC&to=ETH&amount=10`);

fetch(apiUrl)
.then(response=>{
    console.log(response.ok, response.status);
    return response.json()
})
.then(data=>{
    console.log(data)
})
.catch(error=>{
    console.log("error fetching currency data",error);
})
