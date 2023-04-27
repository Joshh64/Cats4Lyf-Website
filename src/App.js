import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import { faker } from "@faker-js/faker";
import './App.css';

import Home from "./pages/home"
import About from "./pages/about"

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(fetch("https://api.thecatapi.com/v1/images/search"));
      }
      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map((res) => res.json()));
      const newProducts = data.map((catData) => {
        const name = faker.commerce.productName();
        const price = faker.commerce.price();
        return { image: catData[0].url, name, price };
      });
      setProducts(newProducts);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <h1>Cats4Lyf</h1>

      <NavBar>
        <NavLinks>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </NavLinks>
      </NavBar>

      <Routes>
        <Route path="/home" element={<Home products={products} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// styled components

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: #fff;
  margin-left: 20px;

  &:hover {
    text-decoration: underline;
  }
`;