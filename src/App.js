import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Button,Select,Input,Text,Heading } from '@chakra-ui/react'

function App() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState("");
  const [search, setSearch] = useState("");
  const [dataPerPage, setDataPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  //Pagination
  const totalPages = Math.ceil(data.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  console.log(pages);
  const indexOfLastData = currentPage * dataPerPage; //40;
  const indexOfFirstData = indexOfLastData - dataPerPage; //10;

  const visibleData = data.slice(indexOfFirstData, indexOfLastData);

  const handlePrev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage !== 1) setCurrentPage(currentPage + 1);
  };
  //---------------------------------------------

  //Filter
  const handleFilter = (e) => {
    // console.log(e.target.value)
    axios
      .get(`https://restcountries.com/v3.1/region/${e.target.value}`)
      .then((res) => setData(res.data));
  };
  //---------------------------------------------------

  //Sorting
  const handleSort = (e) => {
    // console.log(e.target.value)
    setSorting(e.target.value);
    let sorted = [];
    if (sorting === "desc") {
      sorted = data.sort((a, b) => a.population - b.population);
    } else {
      sorted = data.sort((a, b) => b.population - a.population);
    }
    setData(sorted);
  };
  //--------------------------------------------------------
  //Searching
  const handleSearch = (e) => {
    // console.log(e.target.value)
    setSearch(e.target.value);
  };

  //-------------------------------------------------------------------

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* {Limit} */}
        <div>
        <Text fontSize='2xl'>Limit</Text>
          <Select onChange={(e) => setDataPerPage(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </Select>
        </div>

        {/* Filtering */}
        <div>
          <Text fontSize='2xl'>Filter by Region</Text>
          <Select className="filter-select" onChange={handleFilter}>
            <option value="">Select option</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
          </Select>
        </div>
        {/* Sorting */}
        <div>
        <Text fontSize='2xl'>Sort By Population</Text>
          <Select className="sort-select" onChange={handleSort}>
            <option value="">Select option</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Select>
        </div>
        {/* Search */}
        <div>
          <Input
            type="text"
            placeholder="Search by Country Name"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="card-grid">
        {visibleData
          .filter((item) =>
            item.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div className="card" key={item.name.official}>
              <img src={item.flags.png} alt="flags" />
              <Text fontSize='4xl'>{item.name.common}</Text>
              <hr/>
              <Text fontSize='2xl'>Population: {item.population}</Text>
              <Text fontSize='2xl'>Region :{item.region}</Text>
              <Text fontSize='2xl'>Capital: {item.capital}</Text>
            </div>
          ))}
      </div>
      <div className="pagi">
        <Button onClick={handlePrev}>PREV</Button>
        <p>
          {pages.map((el, i) => (
            <span
              key={el}
              onClick={() => setCurrentPage(el)}
              className={`${currentPage === el ? "active" : ""}`}>
              <Button>{el}</Button>
            </span>
          ))}
        </p>
        <Button onClick={handleNext}>NEXT</Button>
      </div>
    </div>
  );
}

export default App;
