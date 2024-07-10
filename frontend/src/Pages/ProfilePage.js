import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  margin-top: 50px;
  color: #333;
  display: flex;
  justify-content: center;
  font-family: "Helvetica"
`;

const MainBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  width: 300px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const ProfileButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background: #0056b3;
  }
`;

const ProfileComponent = () => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await axios.get("http://localhost:8000/api/profile/gale");
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchProfileData();
  }, []);

  return (
    <Container>
      <MainBody>
        <Card>
          <div style={{ textAlign: "center" }}>
            <ProfileImage
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="Admin"
            />
            <h3>{profileData.name}</h3>
            <div>
              <ProfileButton>Edit</ProfileButton>
              <ProfileButton>Save</ProfileButton>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Personal Information</h3>
          <hr />
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Age:</strong> {profileData.age}</p>
          <p><strong>Weight:</strong> {profileData.weight}</p>
          <p><strong>Gender:</strong> {profileData.gender}</p>
          <p><strong>Phone:</strong> {profileData.phone}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
        </Card>
        <Card>
          <h3>Health Information</h3>
          <hr />
          <p><strong>Daily Step Count:</strong> {profileData.dailyStepCount}</p>
          <p><strong>BMI:</strong> {profileData.bmi}</p>
        </Card>
      </MainBody>
    </Container>
  );
};

export default ProfileComponent;
