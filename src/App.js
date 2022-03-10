import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error))

  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filterCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <div className="coin-app">

      <div className="coins-search">
        <h1 className="coin-text">Pesquise sua criptomoeda</h1>
          <input
           type="text"
           placeholder="Criptomoeda"
           className="coin-input"
            onChange={handleChange}
           />
      </div>

      {

        filterCoins == '' ?
        
        <p>Nenhuma moeda encontrada</p>

        :

        filterCoins.map((coin) => {
            return(
              <Coin
               key={coin.id}
               name={coin.name}
               image={coin.image}
               symbol={coin.symbol}
               marketcap={coin.market_cap}
               price={coin.current_price}
               priceChange={coin.price_change_percentage_24h}
               volume={coin.total_volume}
                />
            )
        })
      }

    </div>
  );
}

export default App;
