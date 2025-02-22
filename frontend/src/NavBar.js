import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "./assets/reciptruths.png";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const NavbarContainer = styled.nav`
  font-family: monospace;
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #f7f8f8;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Logo = styled.img`
  margin-top: -1.3rem;
  position: relative;
  height: 40px;
  max-width: 60px;
  z-index: 1000;
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin-top: -2.1rem;
`;

const NavItem = styled.li`
  margin-left: 1.5rem;
  margin-top: 1rem;
  width: 100px;
  text-align: center;
  border-radius: 20px;
  &:hover {
    border: 0.5px solid black;
  }
`;

const NavLink = styled(Link)`
  font-family:monospace;
  font-size: 1.2rem;
  font-weight: 900;
  text-align: center;
  color: #096577;
  text-decoration: none;
  padding: 1rem 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ color }) => color || '#6f7073'};
    font-weight: 800;
    padding: 1rem 1rem;
  }
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-weight: 900;
  ${DropdownMenu}:hover & {
    display: block;
    top:55px;
  }
`;

const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color:  ${({ color }) => color || '#b2b2b2'};
  }
`;

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [recipeDropdownOpen, setRecipeDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <NavbarContainer>
      <NavWrapper>
        <Link to="/">
          <Logo src={logo} alt="logo" className="logo" />
        </Link>
        <h2 className="text-lg mb-4 ml-2 font-bold text-green-500">Vital </h2>
        <h2 className="text-lg mb-4 font-bold text-red-500">Recipes</h2>
        <div>
          <NavMenu>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <DropdownMenu>
              <NavItem>
                <NavLink to="#" onClick={() => setRecipeDropdownOpen(!recipeDropdownOpen)}>
                  Recipe
                </NavLink>
              </NavItem>
              <DropdownContent>
                <DropdownItem to="/recipesearch">Recipe Search</DropdownItem>
                {user && <DropdownItem color="#6fcfd1" to="/myrecipe">My Recipe</DropdownItem>}
                {user && <DropdownItem color="#6fcfd1" to="/createOwnRecipe">Create Recipe</DropdownItem>}
                {user && <DropdownItem color="#63bf62"  to="/plan">Enter Weight</DropdownItem>}
                {user && <DropdownItem color="#63bf62" to="/graphData">Weight Chart </DropdownItem>}
              </DropdownContent>
            </DropdownMenu>
            <DropdownMenu>
              <NavItem>
                <NavLink to="#" onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}>
                  Account
                </NavLink>
              </NavItem>
              <DropdownContent>
                {user ? (
                  <>
                    <DropdownItem to="#" onClick={handleLogout}>
                      Logout
                    </DropdownItem>
                    <DropdownItem to="/profile">Profile</DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem to="/login">Login</DropdownItem>
                    <DropdownItem to="/signup">Signup</DropdownItem>
                  </>
                )}
              </DropdownContent>
            </DropdownMenu>
            <NavItem>
              <NavLink to="/about">About</NavLink>
            </NavItem>
          </NavMenu>
        </div>
      </NavWrapper>
    </NavbarContainer>
  );
};

export default NavBar;
