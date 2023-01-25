import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTempers,
  filterDogsByTemper,
  filterDogsByOrigin,
  ascOrDesc,
  order,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  let dogs = useSelector((state) => state.RootReducer.dogs);
  const tempers = useSelector((state) => state.RootReducer.tempers);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [orders, setOrder] = useState("asc");
  const [typeOfOrder, setTypeOfOrder] = useState("alf");
  const indexOFLastDog = currentPage * dogsPerPage;
  const indexOfFristDog = indexOFLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFristDog, indexOFLastDog);

  const LOCAL_STORAGE_KEY = "filtered.dogs";

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTempers());
    // const storedDogs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(storedDogs) dogs = storedDogs
    
  }, []);

  // Working on local storage usage 

//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dogs));
//   }, [dogs]);

  function handleFilterByTemper(e) {
    dispatch(filterDogsByTemper(e.target.value));
  }

  function handleFilterByOrigin(e) {
    dispatch(filterDogsByOrigin(e.target.value));
  }

  function handleOrderWay(e) {
    setOrder(e.target.value);
    dispatch(ascOrDesc(e.target.value));
  }

  function handleOrder(e) {
    dispatch(order(e.target.value));
    setTypeOfOrder(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    paginated(1);
  }

  //Sorted and No Duplicates Tempers
  const sortedTempers = tempers?.map((e) => e.name.toLowerCase()).sort();
  const tempersSet = new Set(sortedTempers);
  const noDuplicatesSortedTempers = [];
  for (let item of tempersSet) {
    let newStr = item.charAt(0).toUpperCase() + item.slice(1);
    noDuplicatesSortedTempers.push(newStr);
  }

  return (
    <div>
      <div className="homeHeader">
        <Link to="/">
          <img
            src="https://www.clipartmax.com/png/full/3-39170_paw-print-dog-paw-vector-graphic-dog-paw-print-vector.png"
            alt="no img"
          />
        </Link>
        <h1>Dog Search</h1>
        <div className="space" />

        <button className="createDog">
          <Link to="/dog">Create a Dog</Link>
        </button>
      </div>

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all dogs
      </button>

      <div>
        <select onChange={(e) => handleFilterByTemper(e)}>
          <option value="All">All</option>
          {noDuplicatesSortedTempers.map((temper, i) => {
            return (
              <option value={temper} key={i}>
                {temper}
              </option>
            );
          })}
        </select>

        <select onChange={(e) => handleOrder(e)}>
          <option value="alf">Alphabetical Order</option>
          <option value="peso">Weight</option>
        </select>

        <select onChange={(e) => handleOrderWay(e)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select onChange={(e) => handleFilterByOrigin(e)}>
          <option value="all">All</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
      </div>

      <SearchBar />

      <div className="table">
        <Pagination
          dogsPerPage={dogsPerPage}
          dogs={dogs.length}
          paginated={paginated}
        />
      </div>
      <ul className="cards">
        {currentDogs?.map((el) => {
          return (
            <li key={el.id}>
              <Link style={{ textDecoration: "none" }} to={"/detail/" + el.id}>
                <Card
                  name={el.name}
                  image={
                    el.image
                      ? el.image
                      : "https://www.clipartmax.com/png/full/3-39170_paw-print-dog-paw-vector-graphic-dog-paw-print-vector.png"
                  }
                  temperament={
                    el.temperament
                      ? el.temperament
                      : el.temperaments?.map((el) => el.name).join(", ")
                  }
                  weight={el.weight}
                  key={el.id}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="table">
        <Pagination
          dogsPerPage={dogsPerPage}
          dogs={dogs.length}
          paginated={paginated}
        />
      </div>
    </div>
  );
}
