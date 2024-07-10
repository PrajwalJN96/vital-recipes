import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import hero from "../assets/homeimg.jpg";
import profileimg from "../assets/profile.jpg";

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
flex-wrap:wrap;
`;

const MainTitle = styled.h2`
font-family: Courier New;
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

function About() {
  const [aboutPageData, setAboutPageData] = useState(null);

  return (
    <HomePageContainer>
    <MainContent>
            <MainTitle>About Us</MainTitle>
            < MainText>Welcome to our recipe app, where healthy living meets culinary delight. Our platform is designed to help you explore a diverse array of delicious recipes tailored to your dietary preferences. With easy-to-use filters and detailed health ratings, we empower you to make nutritious choices effortlessly. Join us on a journey to better eating, where every meal is a celebration of flavor and well-being</ MainText>   
    </MainContent>
    <MainContent>
    <section className="px-2 py-10 md:px-0">
      <div className="mx-auto max-w-4xl">
        <div className="md:flex md:items-center md:justify-center md:space-x-14">
          <div className="relative h-48 w-48 flex-shrink-0">
            <img
              className="relative h-48 w-48 rounded-full object-cover"
              src={profileimg}
              alt=""
            />
          </div>
          <div className="mt-10 md:mt-0">
            <blockquote>
              <p className="text-xl text-black">
                “Full Stack Developer with a passion for frontend excellence and backend problem-solving. Eager to embrace new technologies and constantly build.”
              </p>
            </blockquote>
            <p className="mt-7 text-lg font-semibold text-black">Prajwal J N</p>
            <p className="mt-1 text-base text-gray-600">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </section>
    </MainContent>
    </HomePageContainer>
  );
}

export default About;
