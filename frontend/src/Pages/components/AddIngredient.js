import React,{useState} from 'react'
import styled from 'styled-components';

const InputGroup = styled.div`
  margin-bottom: 15px;
`;


const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width:700px;
  height:30px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddIngredient = () => {
  const [ingredients, setIngredients] = useState("");

  const handleIngredients = () =>{
    
  }

  return (
    <>
    <InputGroup>
    <Input name="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
    </InputGroup>
    </>
  )
}

export default AddIngredient