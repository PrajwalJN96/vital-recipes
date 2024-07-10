import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DisplayContainer = styled.div`
  max-width: 800px;

  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const GraphData = () => {
  const [weightData, setWeightData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showWeightData, setShowWeightData] = useState(false);
  const [years, setYears] = useState(true);

  useEffect(() => {
    fetchWeightData();
  }, [selectedYear]);

  const fetchWeightData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/plan/showWeight/${selectedYear}`);
      setWeightData(response.data);
    } catch (error) {
      console.error('Error fetching weight data:', error);
    }
  };

  const fetch5YearsWeightData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/plan/show5yearWeight/${selectedYear}`);
      setWeightData(response.data);
      handleYears()
    } catch (error) {
      console.error('Error fetching 5 years weight data:', error);
    }
  };

  const toggleWeightData = () => {
    setShowWeightData(!showWeightData);
  };

  const monthFormatter = (tick) => {
    return months[tick]; 
  };

  const handleYears = () => {
    setYears(!years) 
  };

  return (
    <DisplayContainer>
      <h2 className='text-2xl font-medium mt-3 mb-3'>Weight Tracker </h2>
      <InputGroup>
        <Label htmlFor="showyear">Year:</Label>
        <input
          type="number"
          id="showyear"
          value={selectedYear}  className='border-2 mr-3 border-slate-500'
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        />
      </InputGroup>
      <button  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black m-3" onClick={toggleWeightData}>
        {showWeightData ? 'Hide Weight Data' : 'Show Weight Data'}
      </button>
      <button  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" onClick={fetch5YearsWeightData}>5 years {selectedYear - 5} to {selectedYear}</button>
      {showWeightData && (
        <>
          <h3>Weight Data for {years ? `${selectedYear}` :`${selectedYear-5} - ${selectedYear}`} </h3>
          <LineChart width={800} height={400} data={weightData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" tickFormatter={monthFormatter} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
        </>
      )}
    </DisplayContainer>
  );
};

export default GraphData;
