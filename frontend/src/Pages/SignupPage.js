import React, {  useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  position: relative;
  width:100vw;
  height: 91vh;
  background-color: #000;
`;
const Container = styled.div`
position: absolute;
  top: 50%;
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
  margin: 10px 0px;
  display: flex;
  position: relative;
`;

const Button = styled.button`
  flex: 1;
  padding: 5px 16px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: black;
  color: #fff;
  cursor: pointer;
`;

const FormBox = styled.div`
  width: 100%;
  height: 380px;
  overflow: hidden;
  position: relative;
`;

const Form = styled.form`
  width: 85%;
  margin: 0 auto;
`;

const InputFieldBox = styled.div`
  height: 250px;
  overflow-y: auto;
`;

const InputBox = styled.div`
  width: 100%;
  margin: 18px 0px;
  text-align: center;
  position: relative;
  overflow-y: hidden;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 6px 0px;
  border-width: 0px 0px 2px 0px;
  outline: none;
  border-color: #000;
  &::placeholder {
    color: #6d6d6d;
    opacity: 1;
  }
`;

const Links = styled.p`
  font-size: 14px;
  text-align: center;
  margin: 15px 0px;
`;

const StyledLink = styled.a`
  color: blue;
  text-decoration: none;
  font-weight: bold;
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

const SignupPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const notify = () => {toast.success("Sign up successful",{position: "top-right",autoClose: 5000})}

  const navigate = useNavigate();
  
  // const handleSubmit = async (formData) => {
  //   try {
  //     const response = await axios.post("/api/signup", formData);
  //     if (response.data.message === "Signup successful") {
  //       notify();
  //       setName("");
  //       setEmail("");
  //       setPhoneNumber("");
  //     } else {
  //       console.log(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error occurred while signing up:", error);
  //   }
  // };
  
  // const signUp = async (e,name,email,phoneNumber) => {
  //   e.preventDefault();
  //   try {
  //     const success = await createUserWithEmailAndPassword(getAuth(), email, password);
  //     if (success) {
  //       handleSubmit({ name, email, phoneNumber }); 
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = { name, email, phoneNumber };
    try {
      const response = await axios.post("http://localhost:8000/api/signup/signin", {
        name,
        email,
        phoneNumber
      });
      // if (response.data.message === "Signup successful") {
        // notify();
        setName("");
        setEmail("");
        setPhoneNumber("");
      // } else {
        // console.log(response.data.message);
      // }
    } catch (error) {
      console.error("Error occurred while signing up:", error);
    }
  };
  
 

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const success = await createUserWithEmailAndPassword(getAuth(), email, password);
      if (success) {
        // await handleSubmit(); 
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  

  return (
    <MainContainer>
    <Container>
      <ButtonBox>
        <Button>Sign Up</Button>
      </ButtonBox>
      <FormBox>
        {/* <Form
          className="signup_form"
          onSubmit={(e,name,email,phoneNumber) =>{signUp(e,name,email,phoneNumber)}}
        > */}
          {/* <Form
        className="signup_form"
      onSubmit={e =>{handleSubmit(e)}} 
      > */}
          <InputFieldBox>
            <InputBox>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Username"
                />
            </InputBox>
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
            <InputBox>
              <Input
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                placeholder="phone number"
                />
            </InputBox>
          </InputFieldBox>
          <Links >
            By creating an account you agree to our{" "}
            <StyledLink ><Link to="/termsandconditions">Terms and Conditions</Link></StyledLink>
          </Links>
          <StyledButton type="submit" onClick={e =>{signUp(e);handleSubmit(e)}} >Create Account</StyledButton>
          <ToastContainer/>
        {/* </Form> */}
      </FormBox>
    </Container>
  </MainContainer>
  );
};

export default SignupPage;
