import React from 'react'
import styled from 'styled-components';

// Styled components for the 404 page
const Page404Section = styled.section`
  padding: 40px 0;
  background: #fff;
  font-family: 'Arvo', serif;
`;

const BackgroundImage = styled.div`
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  position: relative;
  height: 500px;
  left:300px;
  background-position: cover-center;
  background-repeat: no-repeat; 
`;

const Heading1 = styled.h1`
  font-size: 80px;
  position:relative;
  left:300px;
`;

const Heading3 = styled.h3`
position: relative;
  font-size: 80px;
  left:300px;
`;

const Link404 = styled.a`
position: relative;
  color: #fff!important;
  padding: 5px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
  bottom:20px;
  left:300px;
`;

const ContantBox404 = styled.div`
  margin-top: -70px;
`;

// 404 Page component
const NotFoundPage = () => {
  return (
    <Page404Section className="page_404">
      <div className="container">
        <div className="row">	
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <BackgroundImage className="four_zero_four_bg">
                <Heading1 className="text-center">404</Heading1>
              </BackgroundImage>
              <ContantBox404 className="contant_box_404">
                <Heading3 className="h2">Look like you're lost</Heading3>
                <Link404 href="/">Go to Home</Link404>
              </ContantBox404>
            </div>
          </div>
        </div>
      </div>
    </Page404Section>
  );
};

export default NotFoundPage;
