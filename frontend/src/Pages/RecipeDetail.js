import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
`;

const RecipeCard = styled.div`
  width: 80%;
  max-width: 600px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const RecipeTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`;

const RecipeText = styled.p`
  font-size: 18px;
  margin-bottom: 15px;
  line-height: 1.5;
`;



function RecipeDetail() {
  const { name } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/myrecipe/${name}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [name]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <RecipeContainer>
      <RecipeCard>
        <RecipeTitle>{recipe.recipeName}</RecipeTitle>
        <RecipeText><strong>Ingredients:</strong> {recipe.ingredients}</RecipeText>
        <RecipeText><strong>Serves:</strong> {recipe.serves}</RecipeText>
        <RecipeText><strong>Procedure:</strong> {recipe.procedure}</RecipeText>
      </RecipeCard>
    </RecipeContainer>
  );
}

export default RecipeDetail;