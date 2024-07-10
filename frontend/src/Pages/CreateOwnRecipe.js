import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import sideimg from "../assets/ownrecipe.jpg"

import { createGlobalStyle } from 'styled-components';

const GlobalReset = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }`;


const FormContainer = styled.div`
  position: absolute;
  right: 0;
  width: 50%;
  height:0%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Img=styled.img`
position: absolute;
top:50px;
z-index:-10;
left:0;
height:100%;
width:50%;
background-size: cover;
 background-position: center;
background-image: url(${sideimg});
`

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 655px;
  height: 30px;
  padding: 10px 20px 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RadioInputGroup = styled.div`
  display: flex;
  align-items: center;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
  font-weight: 600;
  position: relative;
`;

function CreateOwnRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [serves, setServes] = useState("");
  const [procedure, setProcedure] = useState("");
  const [diet, setDiet] = useState("");

  const handleSubmits = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createownrecipe/recipe",
        {
          recipeName,
          ingredients,
          serves,
          procedure,
          diet 
        }
      );
      setRecipeName("");
      setIngredients("");
      setServes("");
      setProcedure("");
      setDiet("") 
    } catch (error) {
      console.error("could not add recipe", error);
    }
  };

  return (
    <div className="w-100% min-h-screen">
    <Img></Img>
    <FormContainer>
      <h1 className='text-2xl font-medium mt-3 mb-3'>Create own recipe</h1>
      <InputGroup>
        <Label htmlFor="recipeName">Recipe Name</Label>
        <Input
          type="text"
          id="recipeName"
          name="recipeName"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="ingredients">Ingredients</Label>
        <TextArea
          id="ingredients"
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows="1"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="serves">Serves</Label>
        <Input
          type="text"
          id="serves"
          name="serves"
          value={serves}
          onChange={(e) => setServes(e.target.value)}
          />
      </InputGroup>

      <RadioInputGroup>
        <RadioLabel>
          Veg
          <Input type="radio" name="diet" value="veg" checked={diet === 'veg'} onChange={() => setDiet('veg')} />
        </RadioLabel>
        <RadioLabel>
          Non-veg
          <Input type="radio" name="diet" value="non-veg" checked={diet === 'non-veg'} onChange={() => setDiet('non-veg')} />
        </RadioLabel>
      </RadioInputGroup>

      <InputGroup>
        <Label htmlFor="procedure">Procedure</Label>
        <TextArea
          id="procedure"
          name="procedure"
          value={procedure}
          onChange={(e) => setProcedure(e.target.value)}
          rows="4"
          />
      </InputGroup>
     
      <InputGroup>
        <button
        type="button"
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={handleSubmits}>Submit
      </button>
      </InputGroup>
    </FormContainer>
      </div>
  );
}

export default CreateOwnRecipe;
