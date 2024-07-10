import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RecipePage from "./Pages/RecipePage";
import SignupPage from "./Pages/SignupPage";
import CreateOwnRecipe from "./Pages/CreateOwnRecipe";
import NotFoundPage from "./Pages/NotFoundPage";
import NavBar from "./NavBar";
import About from "./Pages/About";
import ProfilePage from "./Pages/ProfilePage";
import TermsAndConditions from "./Pages/TermsAndConditions";
import MyRecipe from "./Pages/MyRecipe";
import RecipeDetail from "./Pages/RecipeDetail";
import PlanPage from "./Pages/PlanPage";
import GraphData from "./Pages/GraphData";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "./Pages/components/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/recipesearch"
              element={user ? <RecipePage /> : <Navigate to="/login" />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/profile"
              element={user ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/createownrecipe"
              element={user ? <CreateOwnRecipe /> : <Navigate to="/login" />}
            />
            <Route
              path="/myrecipe"
              element={user ? <MyRecipe /> : <Navigate to="/login" />}
            />
            <Route
              path="/termsandconditions"
              element={<TermsAndConditions />}
            />
            <Route path="/myrecipe/:name" element={<RecipeDetail />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/graphData" element={<GraphData />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
