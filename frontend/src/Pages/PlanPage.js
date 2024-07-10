import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  max-width: 800px;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const SliderInput = styled.input`
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3; 
  }

  &:active {
    background-color: #002336; 
    transform: translateY(1px); 
  }
`;

const PlanPage = () => {
  const [weight, setWeight] = useState(100);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const saveWeight = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/plan/weight', {
        weight,
        month,
        year,
      });
      if (response.status === 200) {
        console.log('Weight saved successfully');
      } else {
        console.error('Failed to save weight');
      }
    } catch (error) {
      console.error('Error saving weight:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveWeight();
  };

  return (
    <FormContainer>
      <h1 className='text-2xl font-medium mt-3 mb-3'>Weight Tracker - Enter Weight</h1>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="weight">Weight:</Label>
          
          <SliderInput type="range" id="weight"
            min={10}
            max={300}
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}  />
          <span>{weight} kgs</span>
        </InputGroup>
        <InputGroup>
          <Label htmlFor="month">Month:</Label>
          <input  className='border-2 mr-3 border-slate-500'
            type="number"
            id="month"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="year">Year:</Label>
          <input
            type="number"
            id="year"
            value={year}  className='border-2 mr-3 border-slate-500'
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </InputGroup>
        <button
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        type="submit">Save
      </button>
      </form>
    </FormContainer>
  );
};

export default PlanPage;
