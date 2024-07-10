import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import hero from "../assets/recipeb.webp";

const MainContainer = styled.div`
  width: 100vw;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const RecipeCardContainer = styled.div`
  width: 380px;
  height: 400px;
  background-color: #ffffff;
  border: 2.5px solid black;
  margin: 20px 35px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  width: 120px;
  height: 40px;
  margin: 10px auto;
  background-color: #000000;
  padding: 0 10px;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const Option = styled.option`
  color: white;
`;

const Veg = styled.div`
  position: relative;
  right: 324px;
  top: 0px;
  text-align: center;
  padding-top: 5px;
  height: 30px;
  width: 80px;
  background-color: lightgreen;
`;

const Nonveg = styled.div`
  position: relative;
  right: 324px;
  top: 0px;
  text-align: center;
  padding-top: 5px;
  height: 30px;
  width: 80px;
  background-color: red;
`;

function MyRecipe() {
  const [recipe, setRecipe] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/myrecipe/allrecipe"
      );
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const filtered = recipes.filter((therecipe) => {
      return therecipe.recipeName.toLowerCase().includes(recipe.toLowerCase());
    });
    setFilteredRecipes(filtered);
  };

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
    if (selectedFilter === "all") {
      setFilteredRecipes(recipes);
    } else if (selectedFilter === "non-veg") {
      const filtered = recipes.filter((recipe) => recipe.diet === "non-veg");
      setFilteredRecipes(filtered);
    } else if (selectedFilter === "veg") {
      const filtered = recipes.filter((recipe) => recipe.diet === "veg");
      setFilteredRecipes(filtered);
    }
  };

  return (
    <div className="flex w-full flex-wrap h-fit bg-slate-200">
      <div className="flex  min-w-full mt-5 mb-2">
        <form
          onSubmit={(e) => handleSearch(e)}
          className="flex justify-center h-10 w-full rounded-md    bg-transparent px-3 "
        >
          <select
            onChange={(e) => handleFilter(e.target.value)}
            value={filter}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-34 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-5"
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
          <div className="flex w-full items-center space-x-2 md:w-1/3 mr-5">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => setRecipe(e.target.value)}
              value={recipe}
              placeholder="Search"
            ></input>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-wrap justify-around">
        {filteredRecipes.map((recipe, index) => (
          // <div className="w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
          //   <a href="#">
          //     <img
          //       className="rounded-t-lg h-64 w-full"
          //       src= {recipe.image}
          //       alt=""
          //     />
          //   </a>
          //   <div className="p-5">
          //     <a href="#">
          //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          //         {recipe.recipeName}
          //       </h5>
          //     </a>
          //     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          //       <strong>Ingredients:</strong> {recipe.ingredients}
          //       <br />
          //       <strong>Serves:</strong> {recipe.serves}
          //       <br />
          //       <strong>Procedure:</strong> {recipe.procedure.slice(0, 30)}
          //     </p>
          //     <a
          //       href="#"
          //       className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          //     >
          //       <Link
          //         to={`/myrecipe/${recipe.recipeName}`}
          //         style={{ textDecoration: "none", color: "inherit" }}
          //         key={index}
          //       >
          //         Read more
          //       </Link>
          //       <svg
          //         className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          //         aria-hidden="true"
          //         xmlns="http://www.w3.org/2000/svg"
          //         fill="none"
          //         viewBox="0 0 14 10"
          //       >
          //         <path
          //           stroke="currentColor"
          //           strokeLinecap="round"
          //           strokeLinejoin="round"
          //           strokeWidth="2"
          //           d="M1 5h12m0 0L9 1m4 4L9 9"
          //         />
          //       </svg>
          //     </a>
          //   </div>
          // </div>
          <div className="relative h-[400px] w-[300px] rounded-md m-5">
      <img
        src={recipe.image}
        alt="AirMax Pro"
        className="z-0 h-full w-full rounded-md object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-left">
        <h1 className="text-lg font-semibold text-white">{recipe.recipeName}</h1>
        <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
        <Link
                   to={`/myrecipe/${recipe.recipeName}`}
                   style={{ textDecoration: "none", color: "inherit" }}
                   key={index}
                 >
                   Read more
                 </Link>&rarr;
        </button>
      </div>
    </div>
        ))}
      </div>
    </div>
  );
}

export default MyRecipe;
