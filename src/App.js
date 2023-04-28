import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import styled from "styled-components";
import { faker } from "@faker-js/faker";
import './App.css';

import Home from "./pages/home"
import About from "./pages/about"

function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);

  const Product = ({ image, name, price }) => {
    return (
      <ProductContainer>
        <ProductImage src={image} alt={name} />
        <h3>{name}</h3>
        <p>£{price}</p>
      </ProductContainer>
    );
  };

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

  const addBasket = (input) => {
    const findIndex = products.findIndex(index => index.name === input);
    const pushArray = basket;
    pushArray.push(findIndex);
    setBasket(pushArray);
    console.log(basket);
  };

// addBasketOriginal
  const sumBasket = () => {
    let totalPrice = []
    for (let i = 0; i < basket.length; i++) {
      totalPrice.push(Number(products[basket[i]].price))
    }
    const sum = totalPrice.reduceRight((acc, cur) => acc + cur, 0);
    console.log(sum)
  }

  return (
    <div>
      {products.map((product, index) => (
        <button onClick={() => addBasket(product.name)}>
          <Product key={index} {...product} />
        </button>
      ))}
      <button onClick={() => sumBasket()}>Tally total</button>
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
          <Route path="/about" element={<About products={products}/>} />
        </Routes>

        <BasketContainer>
        {basket.map((item, index) => (
          <BasketItem key={index}>
            <ProductImage className="basket-image" src={products[item].image} alt={products[item].name} />
            <ProductName>{products[item].name}</ProductName>
            <ProductPrice>£{products[item].price}</ProductPrice>
          </BasketItem>
        ))}
      </BasketContainer>
    </BrowserRouter>
  </div>
);}

export default App;

// Styled Components

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`

const NavLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: #fff;
  margin-left: 20px;

  &:hover {
    text-decoration: underline;
  }
`

const ProductImage = styled.img`
  width: 100px; 
  height: 100px; 
  object-fit: cover;
`
const BasketContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  align-items: center; 
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const BasketItem = styled.div` 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  margin-bottom: 10px;
  
  img {
    margin-bottom: 10px;
  }
`
const ProductName = styled.p` 
  font-size: 16px; 
  font-weight: bold; 
  margin-left: 10px;
`
const ProductPrice = styled.p` 
  font-size: 16px; 
  margin-left: 10px;
`
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;