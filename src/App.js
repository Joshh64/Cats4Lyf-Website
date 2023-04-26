import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { faker } from '@faker-js/faker';

const App = () => {
  const [products, setProducts] = useState([]);

  const Product = ({ image, name, price }) => {
    return (
      <ProductWrapper>
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>£{price}</p>
      </ProductWrapper>
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

  return (
    <ProductsWrapper>
      {products.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </ProductsWrapper>
  );
};

export default App;

// styled components

const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductWrapper = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  text-align: center;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  h3 {
    margin-top: 10px;
    font-size: 20px;
  }

  p {
    margin-top: 5px;
    font-size: 16px;
  }
`;