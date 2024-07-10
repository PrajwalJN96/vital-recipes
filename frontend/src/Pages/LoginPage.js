import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 91vh;
  background-color: #000;
`;

const Container = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 5px 30px -10px rgb(0 0 0);
`;

const ButtonBox = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  position: relative;
`;

const Button = styled.button`
  flex: 1;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: black;
  color: #fff;
`;

const InputBox = styled.div`
  width: 100%;
  margin: 15px 0px;
  text-align: center;
  position: relative;
`;

const Input = styled.input`
  width: 95%;
  font-size: 16px;
  padding: 6px 0px;
  border-width: 0px 0px 2px 0px;
  outline: none;
  border-color: #000;
  &::placeholder {
    color: #6d6d6d;
    opacity: 1; /* Make sure placeholder is always visible */
  }
`;

const PasswordLink = styled.p`
  text-align: right;
  margin: 15px 0px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 8px 20px;
  font-size: 20px;
  border: none;
  background: linear-gradient(45deg, #1645c0, #ed21e4);
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    transform: scale3d(0.9, 0.9, 0.9);
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const logIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      
      // Set authentication token in localStorage
      const user = userCredential.user;
      localStorage.setItem("authToken", user.accessToken);
  
      // Navigate to the desired page after successful login
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <MainContainer>
      <Container>
        <ButtonBox>
          <Button>Login</Button>
        </ButtonBox>
        {error && <p className="error">{error}</p>}
        <InputBox>
          <Input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email Id"
          />
        </InputBox>
        <InputBox>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Create Password"
          />
        </InputBox>
        <PasswordLink>
          <Link to="#">Forgot Password ?</Link>
        </PasswordLink>
        <StyledButton type="submit" onClick={logIn}>
          Login
        </StyledButton>
        <div className="contact_link">
          Need Help ? <Link to="#">Contact Us</Link>
        </div>
      </Container>
    </MainContainer>
  );
};

export default LoginPage;
