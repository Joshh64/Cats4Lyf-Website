import React from "react";
import styled from "styled-components";

function Home({ products }) {
    return (
        <div>
            <h1>This is the Home page</h1>
            <h2>Here you can view the list of cats we have, along with their name, an adorable image of them and their price</h2>
            <h2>To add the cat(s) to your basket, simply click on them</h2>
            <h2>To find out more about the bundle of fur you're looking to adopt, check out their profile on the About page</h2>
            <ProductsWrapper>
                {products.map((product, index) => (
                <ProductWrapper key={index}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>£{product.price}</p>
            </ProductWrapper>
        ))}
            </ProductsWrapper>
        </div>
    );
}
  
export default Home;

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