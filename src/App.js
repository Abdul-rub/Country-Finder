import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, []);


  //Filter
  const handleFilter = (e) => {
    // console.log(e.target.value)
    axios.get(`https://restcountries.com/v3.1/region/${e.target.value}`)
      .then((res) => setData(res.data))
  }


  //Sorting
  const handleSort = (e) => {
    // console.log(e.target.value)
    setSorting(e.target.value)
    let sorted = []
    if (sorting === "desc") {
      sorted = data.sort((a, b) => a.population - b.population)
    } else {
      sorted = data.sort((a, b) => b.population - a.population)
    }
    setData(sorted)
  }
 
  //Searching
  const handleSearch = (e) => {
    // console.log(e.target.value)
    setSearch(e.target.value)
  }

  return (
    <div>
      {/* Filtering */}
      <div style={{ display: "flex", justifyContent:"space-around" }}>
        <div>
          <select className="filter-select"
            onChange={handleFilter}
          >
            <option value="">Select option</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      {/* Sorting */}
      <div>
      <select className="sort-select"
       onChange={handleSort}>
        <option value="">Select option</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
        
      </select>
      </div>
         {/* Search */}
         <div>
          <input type="text" placeholder="Search..." value={search} onChange={handleSearch} />
        </div>
      </div>
      <div className="card-grid">
        {
          data
            .filter((item) => item.name.common.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <div className='card'
                key={item.name.official}
              >
                <img src={item.flags.png} alt="flags"  />
                <h2>{item.name.common}</h2>
                <h4>Population: {item.population}</h4>
                <h4>Region :{item.region}</h4>
                <h4>Capital: {item.capital}</h4>
                <div>

                </div>

              </div>
            ))
        }

      </div>
    </div>
  );
}

export default App;
