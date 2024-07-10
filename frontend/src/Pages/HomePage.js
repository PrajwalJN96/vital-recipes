import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import hero from "../assets/homeimg.jpg";
import card from "../assets/homecard.jpg";

const HomePageContainer = styled.div`
  background: url(${hero});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
`;

const MainContent = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const MainTitle = styled.h2`
  font-family: "Courier New";
  font-size: 32px;
  color: #333333;
  margin: 10px 20px;
`;

const MainText = styled.p`
  font-family: "Arial", sans-serif;
  font-size: 18px;
  color: #555555;
  text-align: left;
  margin: 0 20px;
`;

const RoundedRectangle = styled.div`
  background-color: ${(props) => (props.isHealthy ? "lightgreen" : "red")};
  border-radius: 15px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

function HomePage() {
  const [favoriteRecipesOfUser, setFavoriteRecipesOfUser] = useState(null);
  const [favoriteRecipe, setFavoriteRecipe] = useState(null);
  const [weightData, setWeightData] = useState({ message: false });
  const [showRecipe, setShowRecipe] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavoriteRecipesOfUser() {
      try {
        const responseFavorites = await axios.get(
          "http://127.0.0.1:8000/api/home/userFavoriteRecipes/Gale"
        );
        setFavoriteRecipesOfUser(responseFavorites.data);
      } catch (error) {
        setError(error.message);
      }
    }

    async function weightCheckUser() {
      try {
        const responseWeight = await axios.get(
          "http://127.0.0.1:8000/api/home/compareWeight"
        );
        setWeightData(responseWeight.data);
      } catch (error) {
        setError(error.message);
      }
    }
    weightCheckUser();
    fetchFavoriteRecipesOfUser();
  }, []);

  useEffect(() => {
    if (favoriteRecipesOfUser) {
      fetchFavoriteRecipe();
    }
  }, [favoriteRecipesOfUser]);

  async function fetchFavoriteRecipe() {
    try {
      const favoriteArray = favoriteRecipesOfUser.favoriteRecipes;
      const response = await axios.get(
        `http://localhost:8000/api/home/favoriteRecipes/${favoriteArray[0]}`
      );
      setFavoriteRecipe(response.data);
      setShowRecipe(true);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <HomePageContainer>
      <MainContent>
        <div className="relative h-[400px] w-[300px] rounded-md">
          <img
            src={card}
            alt="AirMax Pro"
            className="z-0 h-full w-auto rounded-md object-cover"
          />
        </div>
        <div className="w-2/3 ">
          <MainTitle>Recipes for home</MainTitle>
          <MainText>
            Welcome to our recipe app, where culinary exploration meets healthy
            living. Discover a world of delicious recipes tailored to your
            dietary needs and preferences. Easily search for dishes, filter by
            nutritional requirements, and explore detailed health ratings for
            each recipe. Empower your journey to better eating with our
            intuitive visual representations and make every meal a nutritious
            delight
          </MainText>
          <RoundedRectangle isHealthy={weightData.message}>
            <Text>{weightData.message ? "Maintain the weight" : "Eat more healthy."}</Text>
          </RoundedRectangle>
        </div>
      </MainContent>
    </HomePageContainer>
  );
}

export default HomePage;
