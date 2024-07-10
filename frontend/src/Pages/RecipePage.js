import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalReset = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }`;

const MainContainer = styled.div`
  width: 100%;
  min-height:100vh;
  background-color: #ebebeb;
  display: flex;
  flex-wrap: wrap;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 40%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/apirecipe/display/${search}`
        );
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, [search]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.elements.search.value);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <>
      <div className="flex min-w-full mt-5 mb-2">
        <form
          onSubmit={(e) => getSearch(e)}
          className="flex justify-center h-10 w-full rounded-md bg-transparent px-3"
        >
          <div className="flex w-full items-center space-x-2 md:w-1/3 mr-5">
            <input
              name="search"
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => updateSearch(e)}
              placeholder="Search..."
            ></input>
            <button
              type="submit"
              className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <MainContainer>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="relative h-[400px] w-[300px] rounded-md m-10">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-left">
              <h1 className="text-lg font-semibold text-white">
                {recipe.title.slice(0, 15)}
              </h1>
              <button onClick={() => openModal(recipe)} className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                View recipe &rarr;
              </button>
            </div>
          </div>
        ))}
      </MainContainer>
      {selectedRecipe && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <h2>{selectedRecipe.title}</h2>
            <p>Ready in Minutes: {selectedRecipe.readyInMinutes}</p>
            <p>Servings: {selectedRecipe.servings}</p>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <p>{selectedRecipe.summary}</p>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default RecipePage;
